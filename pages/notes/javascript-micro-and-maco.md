---
title: 微任务与宏任务
date: 2022-01-19
type: javascript
---

## 宏任务

|     | 浏览器 | NodeJs |
| --- | ------ | ------ |
| I/O |   ✅  |  ✅   | 
| setTimeout |  ✅  | ✅  |
| setInterval |  ✅  |  ✅  |
| setImmediate |  ❌  |  ✅  |
| requestAnimationFrame |  ✅  | ❌  |

## 微任务

|   | 浏览器 | NodeJs |
| --------| ----- | --- |
| Promise.then、catch、finally | ✅  | ✅ |
| process.nextTick | ❌ | ✅  |
| MutationObserver | ✅ | ❌ | 

## 事件循环

每次事件循环时候，检查任务队列是否有微任务存在，如果存在，则先执行完微任务，再执行宏任务

## setImmediate和setTimeout

官方对`setImmediate`的定义是在一次事件循环后立即执行，而`setTimeout`是在一定时间后执行。

二者的执行顺序是不稳定的：

```js
setImmediate(() => console.log(3))
setTimeout(() => console.log(1))
```

除非加一些耗时操作：

```js
setTimeout(() => {
  console.log('hello')
})
for(let i = 0; i < 100; i++ ) {
  let a = ''
  a += 'a'
}
setImmediate(() => {
  console.log('world')
})
```

## Vue.nextTick

对于`Vue`中的`nextTick`函数，为了尽快获得修改后的DOM元素，则是优先使用微任务，然后是宏任务，顺序如下：

1. Promise
2. MutationObserver
3. setImmediate
4. setTimeout

>但是有一个问题，DOM更新是宏任务过程，那么Vue是如何在微任务时期就拿到更改后的最新DOM呢？

答案是`Vue.nextTick`中拿到的不是真实DOM，而是经过`patch`后的虚拟DOM，通过获取它的结构从而获知最新的DOM，此时还没有渲染真实DOM到页面上

## DOM渲染

DOM渲染发生在微任务之后，宏任务之前

```js
document.body.style.backgroundColor = 'red'

new Promise((res) => {
  res()
}).then(_ => {
  document.body.style.backgroundColor = 'green'
})

setTimeout(() => {
  document.body.style.backgroundColor = 'blue'
})

```

如上的代码结果就是，**背景颜色先变绿，然后立马变蓝**，所以就证明了
```shell
微任务 -> DOM渲染 -> 宏任务
```