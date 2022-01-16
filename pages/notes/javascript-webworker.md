---
title: WebWorker的使用
date: 2022-01-16
type: javascript
---

运行环境：浏览器

index.html中:

```js
const worker = new WebWorker('data.js') //传入某个文件

worker.postMessage(2000000) //进程间通信，发送消息给webworker

worker.onmessage = (e) => {  //监听接受消息事件
  console.log('webworker发来消息:', e.data)
}
```
data.js中:

```js
function handler(num) {
  while(num--) {
    let s = ''
    for(let i = 0; i < 300; i++) {
      s += 'h'
    }
  }
}

onmessage = (e) => {
  console.log('接收到主进程的消息：', e.data)
  handler(e.data)
  postMessage('数据处理完毕') //发送消息给主进程
}
```