---
title: Browser
---

[[toc]]

### 垃圾回收

Chrome 采用垃圾回收机制来回收不再使用的内存

* 标记清除
  * 执行标记清除算法，查找不活跃的对象，清除掉
  * 新生代，分为两部分，from-space 和 to-space
* 分代回收
  * 如果经历了标记清楚2-3次后，还在，说明这个对象会停留比较久的时间，此时应该把它放到老生代当中
  * 标记已经非活跃的对象
  * 清楚非活跃的对象
  * 碎片整理

### 宏任务和微任务

宏任务是指每次执行栈中的同步任务都会被认为是宏任务，如 JavaScript 中的同步代码 setTimeout、setInterval 等

微任务是指每次执行栈中的同步任务执行完毕后，会检查是否有微任务需要执行，如果有，就会将微任务添加到事件循环中执行

### 网络中断后是如何继续下载的

HTTP 协议中包含了一个 range 字段，客户端请求的时候，指定这个字段的值，服务器处理请求的时候，会根据这个 range 返回文件中指定部分的内容

总之，前端通过断点续传通过 HTTP 的range 字段实现，能够让客户端下载大文件时，网络中断恢复后，继续下载

### 事件循环

事件循环的核心是一个事件队列，我们知道，javascript 代码是单线程执行的，但是又一些任务必须异步执行，例如定时器，网路请求，这个时候就需要将异步任务放入事件队列，同时不断检查事件队列是否有任务需要执行，就会放到主线程中去执行

事件循环机制保证了异步任务能够在合适的时机执行，保障了程序的正常运行

### 浏览器输入 URL 发生了什么

* 浏览器检查 DNS 缓存
* 向 DNS 服务器发起查询
* 浏览器和服务器建立链接
* 服务器响应请求
* 浏览器渲染页面

### 强缓存和协商缓存

强缓存是指，浏览器在接受到 HTTP 请求的返回信息，会把文件内容和过期时间等信息储存起来，当再次发起这个请求，会检查 HTTP 协议中的限制条件（过期时间、缓存控制等），如果满足条件会直接返回缓存中的内容，否则，去服务器获取

协商缓存是指当缓存中存在不可用的资源或者过期的资源，需要向服务器发起请求来获取最新的资源。浏览器会发起一个请求，包含缓存的信息，浏览器会根据这个请求的信息，来判断是否返回新的资源