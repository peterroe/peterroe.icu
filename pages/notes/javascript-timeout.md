---
title: 手动实现request超时控制
date: 2022-02-20
type: javascript
---

> 通常发送request的时候，很有必要用到超时的功能，我们可以借用Promise手动实现

## fetch

以[`fetch`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)举例子

```js
function timeOut(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('超时了')
    }, time)
  })
}

Promise.race([
  timeOut(100),
  fetch('http://localhost:5000').then(response => response.json())
]).then(value => {
  console.log(value)
})
```

## axios

以[`axios`](http://www.axios-js.com/)举例子

```js
Promise.race([
  timeOut(100),
  axios.get('http://localhost:5000')
]).then(value => {
  console.log(value)
})
```