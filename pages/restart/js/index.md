---
title: JavaScript
---

[[toc]]

### 历史

**始于网景**

Netscape Navigator解释器

诞生于 1995 年 5 月，由 Brendan Eich 花了十几天的时间设计出来。9 月，改名为 LiveScript，12 月，为了蹭上 Java 的热度，改名 JavaScript

微软对上述的解释器逆向，创建了 JScript，并添加了一些专属对象

**设计来源**

* Self语言（基于原型的编程语言）
* Schema语言（函数式编程）
* C语言（语法结构：分支、循环）

**标准化**

1996 年 11 月，网景向 ECMA 提交语言标准。1997 年，制定第一版 ECMAScript 规范

**组成**

一般来说，我们认为 JavaScript 由三部分组成。但也不一定要严格遵守，例如 Nodejs，即使没有 DOM 和 BOM 环境，其核心也称为 JavaScript

* ECMAScript（语言标准）
* DOM
* BOM

### 引擎

用来渲染 HTML/CSS 的叫渲染引擎，执行 JS 的叫 JS 引擎，这两种引擎是浏览器加载 HTML 、执行 JS 的不可或缺的结构

**内核：Webkit/chromium**

内核 Webkit 出自 Apple 公司，所以也装在 Safari 上，其包含了渲染引擎（Web Core）和 JS 引擎（JS Core）两部分。

后 Google 将其改造，改进了渲染引擎（Blink），重写了 JS 引擎（V8），用在 Chrome 上，称为 chromium

chromium 是开源的，Chrome 是不开源的

**Edge浏览器**

原来 Edge 的渲染引擎是自研的 EdgeHTML，JS 引擎是自研的 Chakra，2018 年，微软宣布计划将浏览器重建为基于 Chromium 的 Blink 和 V8 引擎

**Opera**

2013 年，内核从 Presto 切换到 chromium

**Gecko**

火狐浏览器的内核，JS 引擎是 SpiderMonkey

### Error

Error 在 JavaScript 不常被提及。它在运行错误时候被抛出

除了 `Error` 构造函数外，JavaScript 中还有其他的错误构造函数

* EvalError: `eval()` 执行错误
* RangeError: 超出有效范围（`2..toFixed(120)`）
* ReferenceError：引用错误（未定义而使用）
* SyntaxError： 语法错误
* TypeError：类型错误（字符串无法调用数组方法）
* URIError：`decodeURI()` 参数错误
* AggregateError: 聚合错误，发生在 `Promise.any` 全部被拒绝



```js
let arr = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError]

arr.every(it => it.prototype.__proto__ == Error.prototype)
// true
```


### 拓展

* [面试题](/restart/js/interview)
* [手写题](/restart/js/hand)

