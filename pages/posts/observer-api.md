---
title: 了解浏览器的三个Observer API
date: 2022-01-18
duration: 5min
---

[[toc]]

`Observer API`主要使用的是以下三种

* [Intersection Observer](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
* [Mutation Observer](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
* [Resize Observer](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

## Intersection Observer

在用户滚动的时候，可以用来监听某个子元素的可见性

创建一个对象实例:

```js
let io = new IntersectionObserver(callback, options)
```

`callback`是回调函数，`options`是可选配置

```js
const app = document.querySelector('#app')
//观察某一个DOM节点
io.observe(app)
//停止观察某个DOM节点
io.unobserve(app)
//关闭观察器
io.disconnect()
```

<Intersection />

回调函数接受一个参数，当监听的元素进入或者离开根节点，会触发事件，参数中便是监听的全部DOM节点的数组

```js
new Intersection((entries) => {
  console.log(entries)
})
```
打印结果：
```json

{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
```

字段含义：

* `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
* `target`：被观察的目标元素，是一个 DOM 节点对象
* `rootBounds`：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
* `boundingClientRect`：目标元素的矩形区域的信息
* `intersectionRect`：目标元素与视口（或根元素）的交叉区域的信息
* `intersectionRatio`：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0

**option**

```js
new Intersection(() => {} , {
  root: document.querySelector('#app'), //容器元素，默认是HTML
  threshold: [0, 0.25, 0.75], // 当目标元素0%、25%、75%可见时，会触发事件
})
```

## Mutation Observer

作用：监听DOM元素的属性变化

作为`Mutation Event`的替代品，解决了浏览器的部分兼容问题

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

**config**

`config`常用取值：

* `attributeFilter`： Array，要监听的特定属性名称的数组
* `attributes`： Boolean，是否监听属性
* `chidList`： Boolean，设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点
* `subtree`： Boolean，监视范围扩展至目标节点整个节点树中的所有节点

## Resize Observer

监听元素的尺寸变化

<Resize />

**options**

设置观察者将以哪种盒子模型来观察变动。默认的值为 `content-box`

```js
new ResizeObserver().observe(app, {
  box: border-box | content-box
})
```