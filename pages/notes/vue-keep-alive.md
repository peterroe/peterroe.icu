---
title: 揭秘keep-alive
date: 2022-01-21
type: vue
---

## keep-alive的用法

会缓存组件不活动的组件，而不是销毁他们

1. 结合`component`组件

```html
<keep-alive :include="include" :exclude="exclude" :max="maxCount">
  <component :is="current"></component>
</keep-alive>
```

2. 结合`router-view`组件

```html
<keep-alive :include="include" :exclude="exclude" :max="maxCount">
  <router-view :is="current"></router-view>
</keep-alive>
```

## props参数

* `include`：可传字符串、正则表达式、数组，名称匹配成功的组件会被缓存
* `exclude`：可传字符串、正则表达式、数组，名称匹配成功的组件不会被缓存
* `max`：可传数字，限制缓存组件的最大数量，超过`max`则按照`LRU`算法进行置换

## 组件源码

```js
export default {
  name: 'keep-alive',
  abstract: true, // 判断此组件是否需要在渲染成真实DOM
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created() {
    this.cache = Object.create(null) // 创建对象来存储  缓存虚拟dom
    this.keys = [] // 创建数组来存储  缓存key
  },
  mounted() {
    // 实时监听include、exclude的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  destroyed() {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  render() {
      // 下面讲
  }
}
```

其中，`render`是核心函数，它完成了以下任务

* 获取到`keep-alive`包裹的第一个组件名称
* 判断此名称是否能被匹配，能则直接返回`vNode`
* 根据组件`ID`和`Tag`生成`缓存key`，例如`23::div`
* 分别在`cache、keys`中保存`此组件`以及它的`key`，并检查数量是否超过`max`，使用`LRU`算法替换
* 将此组件的`keepAlive`属性设置为`true`

```js
// src/core/components/keep-alive.js

render() {
  const slot = this.$slots.default
  const vnode: VNode = getFirstComponentChild(slot) // 找到第一个子组件对象
  const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
  if (componentOptions) { // 存在组件参数
    // check pattern
    const name: ?string = getComponentName(componentOptions) // 组件名
    const { include, exclude } = this
    if ( // 条件匹配
      // not included
      (include && (!name || !matches(include, name))) ||
      // excluded
      (exclude && name && matches(exclude, name))
    ) {
      return vnode
    }

    const { cache, keys } = this
    const key: ?string = vnode.key == null // 定义组件的缓存key
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
      : vnode.key
    if (cache[key]) { // 已经缓存过该组件
      vnode.componentInstance = cache[key].componentInstance
      // make current key freshest
      remove(keys, key)
      keys.push(key) // 调整key排序
    } else {
      cache[key] = vnode // 缓存组件对象
      keys.push(key)
      // prune oldest entry
      if (this.max && keys.length > parseInt(this.max)) { // 超过缓存数限制，将第一个删除
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
      }
    }

    vnode.data.keepAlive = true // 渲染和执行被包裹组件的钩子函数需要用到
  }
  return vnode || (slot && slot[0])
}
```

## 渲染

vNode -> 真实DOM是发生在patch阶段，而其实这也是要细分的：VNode -> 实例化 -> _update -> 真实DOM，而组件使用缓存的判断就发生在实例化这个阶段，而这个阶段调用的是createComponent函数，那我们就来说说这个函数吧：

```js
// src/core/vdom/patch.js

function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false /* hydrating */)
    }

    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm) // 将缓存的DOM（vnode.elm）插入父元素中
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}

```

* 在第一次加载被包裹组件时，**因为`keep-alive`的`render`先于包裹组件加载之前执行，所以此时`vnode.componentInstance`的值是`undefined`**，而`keepAlive`是`true`，则代码走到`i(vnode, false /* hydrating */)`就不往下走了
* 再次访问包裹组件时，`vnode.componentInstance`的值就是已经缓存的组件实例，那么会执行`insert(parentElm, vnode.elm, refElm)`逻辑，这样就直接把上一次的DOM插入到了父元素中。