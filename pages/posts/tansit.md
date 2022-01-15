---
title: 实现数字过渡效果
date: 2021-12-23
duration: 6min
---

[[toc]]

目的：[实现此链接的效果](https://ungeui.github.io/ungeui/components/transit/)

---

像这样，当一个数字大小变化的时候，我们希望数字也能够过渡：

![one](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08caabd82e8642b2809b6191d405a4e1~tplv-k3u1fbpfcp-zoom-1.image)

## 通过修改DOM来更新视图

试想，一个数字在视图上一直变化，我们必然是要修改`DOM`，可以直接来修改`DOM`元素的内容


## 构思API

想要写好一个库，我们必然要知道用户是如何去调用这个库的，我们希望用户以如下的形式来调用接口

向外面暴露一个函数，希望用户传入DOM的`ID`或者`Class`，以及想修改的值

```html
<span id="app">
    0
</span>

<script>
    setInterval(() => {  //用setInterval模拟数字改变的情况
        const ranDomValue = Math.floor(Math.random() * 1000) //模拟新值
        transit('#app', {
            value: ranDomValue
        })
    }, 2000) 
</script>
```
如此一来，我们就可以可以获得前后的值
```js
function transit(o,{ value }) {
    console.log('旧值:', document.querySelector('#app').innerText)
    console.log('新值:', value)
}
```

## 如何从旧值过渡到新的值？

要知道，新值减去旧值（`newValue-oldValue`）是一个不确定的数字，就意味着每次变更的步幅不同

设想，假设我们希望在**1000ms**内完成过渡效果，数字增长**20**次，那么需要每次增长差值的**五十分之一**

那么可以这么写：

```js
function transit(o,{ value }) {
    const dom = document.querySelector('#app')
    const oldValue = Number(dom.innerText) //转数字
    const newValue = value
    
    const step = (newValue - oldValue) / 50 //布幅为差值的五十分之一
    let time = setInterval(() => {
      
        dom.innerText = Math.floor(Number(dom.innerText) + step )
    },20)
    
    setTimeout(() => {  //1000ms后清除定时器
        clearInterval(time)
    },1000)
}
```

可以看到，我们的程序已经能够跑起来了： [codepen here!](https://codepen.io/peterroe/pen/ZEXpWrY?editors=1111)

## 问题一：边界问题

虽然我们的程序跑起来的，但是会有一个很大的问题，最终的数字与预想的ranDomValue是不相等的，原因很简单

因为`(newValue - oldValue) / 50`大概率是一个小数，不管用`Math.floor`或者`Math.ceil`，经过五十次`Math.floor`再相加，`dom.innerText`很难最终等于`newValue`

虽然最终值可以通过如下方法实现，但某些情况下，最后一跳会变化很大
```js
setTimeout(() => {  //1000ms后清除定时器
    dom.innerText = newValue
    clearInterval(time)
},1000)
```

## 问题二：定时器不准确

众所周知定时器是不准确的，而且还有很多问题，例如**Tab切换**的影响。所以实际上用定时器实现属于是下下策

## 优美的实现-requestAnimationFrame


`requestAnimationFrame`在动画上有着极好的性能，我们利用这个API来实现我们的功能库

对这个接口不太了解可以[先看看这篇文章](/posts/requestanimationframe)

熟悉`requestAnimationFrame`之后，我们可以按照如下的思路实现

```js
let startTime = undefined
const p = (newValue - oldValue) / 1000

requestAnimationFrame(computed)
function computed(temp) {
    if (startTime == undefined) {
        startTime = temp
    }
    
    const elaped = temp - startTime //得到时间差
    const aheadDistance = Math.floor(oldValue + elaped * p)
    if (p > 0) { //新值大于老值就取下限
        dom.innerText = Math.min(aheadDistance, newValue)
    } else {
        dom.innerText = Math.max(aheadDistance, newValue)
    }
    if (elaped < 1000) { //时间差超过1000ms后就不再调用
        requestAnimationFrame(computed)
    }
}
```
上面代码的精髓在于
```js
const aheadDistance = Math.floor(oldValue + elaped * p)
```
因为`elaped`的范围是`0-1000`，而`p`的值是`newValue - oldValue / 1000`

所以`aheadDistance`最终的值就是`newValue`，再通过`Math.max`和`Math.min`保证最终的值和`newValue`是一样的

实现效果：[codepen here!](https://codepen.io/peterroe/pen/oNGzZPX?editors=1111)

## 指定持续时间

我们上面都是假设持续时间为`1000ms`，其实这个参数也可以是动态的：
```js
function transit(o,{ value, duration = 1000}) {
    //...
    const p = (newValue - oldValue) / duration
    //...
    if (elaped < duration) {
        requestAnimationFrame(computed)
    }
}
```

## 支持Vue

实际上，通过直接修改DOM开销实在太大。因为Vue的数据是**双向绑定**的，所以我们把库可以**移植到Vue**上

我们希望用户以这样的形式调用：
```html
<template>
    <div>
        {{obj.value}}
    </div>
</template>

<script setup>
import Transit from '@ungeui/transit'
import { reactive }  from 'vue'
let obj = reactive({
    value: 23
})

setInterval(() => {
    Transit(obj, {
        key: 'value',  //指定修改value属性的值
        duration: 500,
        value: obj.value + 100
    })
},1000)
</script>
```

## 兼容DOM和普通对象

需要判断用户传入的是字符串`#app`还是普通的js对象

```js
let target = null
let attr = null

if (typeof o == 'string') {
    result.target = document.querySelector(o)
    result.attr = 'innerText'
} else {
    result.target = o
    result.attr = name
}
```

然后统一使用`target[attr]`访问
```diff
function transit(o, { duration = 1000, key, value }) {
+    let target = null
+    let attr = null
+    if (typeof o == 'string') {
+        target = document.querySelector(o)
+        attr = 'innerText'
+    } else {
+        target = o
+        attr = key
+    }
    const oldValue = Number(target[attr])
    const newValue = value
    const distance = newValue - oldValue
    const p = distance / duration

    let startTime = undefined

    requestAnimationFrame(computed)

    function computed(temp) {

        if (startTime == undefined) {
            startTime = temp
        }
        const elaped = temp - startTime //0 -> 1000
        const aheadDistance = Math.floor(oldValue + elaped * p)
        if (distance > 0) {
-            dom.innerText = Math.min(aheadDistance, newValue)
+            target[attr] = Math.min(aheadDistance, newValue)
        } else {
-            dom.innerText = Math.max(aheadDistance, newValue)
+            target[attr] = Math.max(aheadDistance, newValue)
        }
        if (elaped < duration) {
            requestAnimationFrame(computed)
        }
    }
}
```

## 结尾

其实上面库的用法很像gsap动画库`gsap.to()`的用法，当然功能还没有那么全面，起初是想利用`gsap.to()`在自己的组件库中写一个数字过渡的效果，奈何组件库打包之后体积增大到了四十多kb`，本来组件库才十几kb...

思来想去，没有办法解决，只能自己实现了这个库，gzip压缩后，仅仅**几百b**的大小，Nice

我已经封装成了NPM包，支持`ESM`和`UMD`，源码地址：<GitHubLink repo="UngeUI/transit"/>

也可以支持一下个人最近在开发的组件库：<GitHubLink repo="UngeUI/ungeui"/>

😀Happy hacker