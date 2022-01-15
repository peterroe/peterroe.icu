---
title: 聊一聊JavaScript模块化
date: 2021-10-31T16:00:00Z
duration: 5min
description: the module development of JS
---

[[toc]]

🚀这几年前端蓬勃发展，前端从模版引擎调用过渡到框架组件，可能很多人会分不清**组件**和**模块**的区别

因为看起来**组件**和**模块**有很多相似点
* 都是一段代码的集合，即都是被封装起来的
* 组件间可以相互调用，模块间也可以相互调用

但是它们的职责是不同的，简而言之就是：


>组件解决了代码复用的问题，模块解决了分而治之的问题


如果你还不太理解上面的概念，也不影响接下来的阅读，但你应该清楚模块是什么

**JavaScript**的模块演化进程很缓慢，因为最开始这门语言就没有模块化（感谢[NodeJs](https://nodejs.org)带来的生态）

## Script标签和闭包

在早期，JavaScript被嵌入到HTML`<script>`标签中

```html
<script>
    console.log('UFO')
</script>
```

这会产生有什么问题呢？

例如我从网上下载了一个模块，这个函数有上千行代码，在这里我们假设只有几行，那么我想要用它的加法功能代码，我直接拷贝过来：

```html
<body>
    <script>  //外部引入的代码
        var count = 0
        function add() {
            return  ++count
        }
    </script>
    <script>  //我的代码
        var box = docoment.getElementById('#box')
        box.onclick = function () {
            box.innerText = add()
        }

        //由于我不知道count的存在，毕竟有几千行代码
        //接下来做其他事情就有可能改变count的值，而对代码产生破坏
        var count = 10 
    </script>
</body>
```

上面的问题很明显，封装功能所依赖的变量不能给外部访问。

我们利用`IIFE`，可以很容易解决这一个问题

## 立即执行函数（IIFE）

立即执行函数会制造一个闭包：

```js
(function() {
    var a = 1
})()

console.log(a) //=>undefined
```

外部无法直接访问里面的变量

通常框架的CDN版本都是以这种方式提供用户使用，例如[Vue](https://cn.vuejs.org/)和[JQuery](https://jquery.com/)

```js
(function (global, factory) {
    global.Vue = factory()
    global.$ = factory()
})(window,function(){
    //...
})
```

通过立即执行函数，把`$`和`Vue`挂载到window对象上

对内封装了逻辑功能，对外仅仅只暴露一个使用的方式，极大的避免了意外改变上下文的情况

```js
$('app')
new Vue()
```

到现在，我们解决了作用域的问题。但另一个问题也随之而来

如何安排它们在HTML中的位置呢？

下面的脚本将会抛出错误
```html
<script>
    new Vue()  //throw Error
</script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

显然，正常情况下，浏览器是从上到下解析脚本的，所以必须先引入CDN链接再使用它

这在通常情况下没有问题，如果是第三方提供的CDN包，你都可以把它们放在`<head>`标签内。

但是一个项目内可能有多个自己或者同事封装的script。这些脚本有很强的先后逻辑关系

项目引入了自建模块数量几十个甚至几百个的时候，这将会十分混乱：

* 模块没有名称，难易分辨
* 依赖管理难以管理
* 即使是挂载到window上，全局变量也太多

##  CommonJs

Js自诞生之期就没有模块的概念，而cjs（即CommonJs）的出现，革命性的使Js也走上了模块化的道路

我们来看一个cjs的例子：

```js title="add.js"
var count = 0
function add() {
    count ++
}
module.exports = add
```
```js title="other.js"
var add = require('./add.js')
setInterval(() => {
   add()
}, 1000);

console.log(count) //Error
```

可以看到，它解决了以下问题：

* 无作用域污染
* 依赖关系明确
* 清晰地知道引用模块以及它的位置

如此看来，cjs已经解决了大部分痛点。

但是遗憾的是，cjs规范只支持在Node环境下，无法在浏览器运行，因为早期cjs就是专攻服务端的

而且cjs的同步加载，也让浏览器不能接受此方案，我们仍然需要一个可以在浏览器上运行的异步模块规范

## AMD

AMD是Asynchronous Module Definition（异步模块定义）的缩写。

AMD也采用`require()`语句加载模块，但是和cjs不同。因为是异步加载，所以得传入回调函数来或者加载完成后的模块

```js
require(['add'], function (add) {
    setInterval(() => {
        add()
    }, 1000)
})
```

AMD规范并不能直接在浏览器端使用，还需要引入实现该规范的库。例如`require.js`

## CMD

CMD的代表库是`SeaJs`

`require.js`是很早提出来的，遵守AMD规范

而SeaJs是[玉伯](https://www.zhihu.com/question/20351507)提出来的，它即遵守AMD规范，又遵守CJS规范，所以叫做CMD

* 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行
* CMD 推崇依赖就近，AMD 推崇依赖前置

```js
// CMD
define(function(require, exports, module) {  
    var a = require('./a')   
    a.doSomething()   // 此处略去 100 行   
    var b = require('./b') // 依赖可以就近书写   
    b.doSomething()   
    // ... 
})
    
// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {  
    // 依赖必须一开始就写好    
    a.doSomething()    
    // 此处略去 100 行    
    b.doSomething()    
    //...
})

```

## UMD

严格来说，UMD并不属于一套规范，主要用来处理CommonJs，AMD，严格来说，UMD并不属于一套规范，主要用来处理CommonJs，AMD，CMD之间的差异兼容

例如`vue@2.6.14`的cdn版本，就使用了UMD规范：
```js
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ?
        module.exports = factory() :
        typeof define === 'function' && define.amd ?
        define(factory) :
        (global = global || self, global.Vue = factory());
}(this, function() {
    //...
})
```

而现在的CDN版本的第三方库，也都是使用UMD来兼容差异

## ES Module

从 [ECMAScript2015/ECMAScript6](https://262.ecma-international.org/6.0/) 开始，JavaScript 原生引入了模块概念

这也是现在最流行的模块化方案：

```js
import add from './add.js'
```

但是此方式不能直接在Node环境运行，究其原因，可能Node主要还是偏向服务端这一方面

而commonJs规范已经能很好满足服务端的需求，但是前端工程化也离不开Node，也必然有模块化的开发方式

于是，像[`webpack`](https://webpack.docschina.org/)，[`rollup`](https://www.rollupjs.com/)，[`parcel`](https://www.parceljs.cn/)等打包工具，把ESM转成其他模块规范

而，现在浏览器也支持原生import方式导入

```html
<script type="module">
import add from './add.js'
</script>
```

于是出现了像[`Vite`](https://www.vitejs.net/guide/)这样利用原生import导入的工具，开发环境下把打包工作交给浏览器，相比传统打包工具要节省许多时间

而到目前为止，ESM也成为了浏览器和服务器通用的模块解决方案

至于未来Node会在哪个版本原生支持import，值得期待~