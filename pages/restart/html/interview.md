---
title: HTML高频面试题
---

## async and defer in script

正常情况下，遇到 script 标签，会先停止 HTML 解析，然后夹在 script 资源，执行 JS 脚本

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0a8a139519f46dfa2d1992c58eb5397~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

如果遇到 async script，并不会停止 HTML 解析，而是同步加载 script 资源，知道加载完成了，在去执行 JS 脚本

而 defer script 类似，也不会停止 HTML 的解析，但是执行时机是在**所有元素解析完成之后，DOMContentLoaded事件触发之前**执行

## margin负值问题

* margin-right 为负值时，自身不会移动，右侧元素会向左移动相应局距离
* margin-left 为负值时,元素自身向左移动相应距离
* margin-bottom 为负值时，自身不会移动，底部侧元素会向上移动相应局距离
* margin-top 为负值时,元素自身向上移动相应距离

## 300 毫秒点击延迟问题

移动端为了识别是否是双击缩放，会等待 300ms

解决方法：

* 用触摸事件，反应会比点击快

* 使用 fastclick 库

```js
FastClick.attach(document.body);
```

* 声明 meta 不能缩放，只能解决 Android 问题

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```

* CSS 解决

```css
.no-300 {
  touch-action：none；
}
```

### 离线存储

是一种缓存技术

当用户无网络的情况下，也可以正常使用某些功能。可以通过在 html 标签上添加 manifest 属性，浏览器会去下载对应的文件中的资源列表，然后缓存

```html
<html lang="en" manifest="index.manifest"></html>
```

可以使用任何的文件扩展名，但必须以正确的 MIME 类型提供

例如：

```shell
CACHE MANIFEST # CACHE MANIFEST 字符串应在第一行，且必不可少

# Explicitly cached 'master entries'.
CACHE:
/favicon.ico
index.html
stylesheet.css
images/logo.png
scripts/main.js

# Resources that require the user to be online.
NETWORK:
login.php
/myapi
http://api.twitter.com

# static.html will be served if main.py is inaccessible
# offline.jpg will be served in place of all images in images/large/
# offline.html will be served in place of all other .html files
FALLBACK:
/main.py /static.html
images/large/ images/offline.jpg
*.html /offline.html
```

浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，所以必须修改清单文件本身才能让浏览器刷新缓存文件

### 浏览器多个页面通信

**webSocket**

让服务器当中间者，🔗两个页面的通信

**LocalStorage**

当 localStorage 变化时，会触发事件，可以对其进行监听获取值

```ts
window.addEventListener('storage', function (e) {
  if(e.key == 'ctc-msg') {
    const data = JSON.parse(e.newValue)
    const text = data.msg
  }
})
```