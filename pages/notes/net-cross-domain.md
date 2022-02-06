---
title: 跨域问题解决方案
date: 2022-02-06
type: net
---

[[toc]]

`img/sript/link`的访问域名不会受到限制，但是`ajax`请求会

跨域问题是由于浏览器的安全限制，但是某些情况下，我们必须得跨域访问，所以需要一些策略解决问题

## CORS

`CORS`是最常用的跨域方法，只需要后端设置响应头即可

## JSONP

目前很少使用，利用`<script>`的跨域能力，前后端配合达到获取数据的能力

## Nginx代理

利用`nginx`，配置例如

```
listen 80;
server_name secondclass;
location / {
  proxy_pass 49.123.0.28:9999;
}
```

## websocket通信

利用`ws`通信也可以做到，其原因是`websocket`不属于浏览器的同源限制范围

## iframe跨域问题

`iframe`跨域可以通过`onmessage/postMessage`来通信，例如

```js
document.querySelector('iframe').onload = function () {
  this.contentWindow.postMessage('hi') //father send

  window.onmessage = function(e) {  //father receive
    console.log(e.data)
  }
}

window.onmessage = function(e) {  //child receive
  console.log(e.data)
  e.source.postMessage('hello')  //child send 
}
```