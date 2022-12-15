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

---

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

---

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

---

[[toc]]

### 面向对象和面向过程的区别

* 都是编程方法
* 面向对象注重设计对象的属性和方法，面向过程则注重指令的调用顺序
* 面向对象支持封装、继承
* 对于复杂项目，通常抽象成类，易于重用且逻辑清晰

### JSBridge

* Native 提供一个 JavaScript 接口，该接口可以被网页调用。所以就可以通过 JS 调用一些客户端的功能，例如打开页面，调用系统功能等
* JavaScript 调用 Native 提供的接口，实现对应的功能
* Native 接收到网页的调用，执行相应操作
* Native 执行完成后，通常还会返回给页面一些信息（可以是同步也可以是异步的）

### 前端传输大文件

* 前端在传输大文件的时候，请求中会包含 Transfer-Encoding 字段，表示使用的 chunked 编码
* 会将文件分成若干个小块，按照 chunked 编码的方式编码后，一次一块发送到服务端
* 服务端对 chunked 数据进行解码，并写入文件中
* 直到所有数据发送完毕

**chunked是什么？**

* 是HTTP 的一种特殊编码方式
* 每一个 chunked 由两部分组成，长度和内容
* 每一个 chunked 以换行符分割，并一次一个发送到服务器端

### shadow Dom？

Shadow Dom 是一种独立的 DOM 和 CSS 环境，可以隔离组件内部的 DOM 结构和样式

主要用于解决以下问题：

* 隔离样式冲突：在多个组件中使用相同的样式，如果改变其中一个组件的样式，会影响其他组件，此时就可以通过 Shadow Dom 进行隔离
* 提升封装性：组件内部的样式可能会受到外部干扰，所以通过 shadow Dom，保证组件样式的稳定
* 提升维护性：如果多个组件用了同一个样式，那么修改组件的时候，就很可能会影响到其他的组件

### 对大前端的理解

大前端是一种新型的前端开发方式，它把传统的前端开发模式拓展到了多端、多技术栈、多平台的领域。大前端的核心理念是让开发人员可以使用一种技术栈，来开发多端应用。这样，开发人员可以充分利用自己的技能，实现代码的复用和维护，提高开发效率。

### this 在 JavaScript 中是如何工作的

* 如果`new`调用函数时使用关键字，函数`this`内部是一个全新的对象。
* 如果`apply`、`call`或`bind`用于调用/创建函数，`this`则函数内部是作为参数传入的对象。
* 如果将函数作为方法调用，例如`obj.method()` — `this`是该函数的属性的对象。
* 如果一个函数作为自由函数调用被调用，这意味着它在没有上述任何条件的情况下被调用，`this`是全局对象。在浏览器中，它是`window`对象。如果在严格模式 ( `'use strict'`) 中，`this`将`undefined`代替全局对象。
* 如果多个上述规则适用，则较高的规则获胜并设置该`this`值。
* 如果函数是 ES2015 箭头函数，它会忽略上述所有规则，并`this`在创建时接收其周围作用域的值。

### 使用 Promise 而不是回调函数有什么优点？

* 解决了回调地狱
* 编写可读的顺序异步代码 `.then()`
* 可以轻松编写并行异步代码 `Promise.all()`

### 什么是闭包？为何要使用闭包？

* 数据私有化
* 柯里化

### 事件循环？

事件循环是一个单线程循环，它监视调用堆栈并检查任务队列中是否有任何工作要做，如果调用堆栈为空并且任务队列中不为空，则将一个函数出列推送到调用堆栈中执行

### 迭代对象？

`for...in`

遍历对象的可枚举属性，包括原型链上的可枚举的属性(enumerable)，所以通常可以加上 `Object.hasOwn()`判断

```js
for (const property in obj) {
  if (Object.hasOwn(obj, property)) {
    console.log(property);
  }
}
```

不推荐使用 `Object.hasOwnProperty` ，因为在通过`Object.create(null)`创建的对象上不生效

`Object.keys()`

返回对象上可枚举的属性数组

`Object.getOwnPropertyNames()`

返回对象上可枚举的和不可枚举的属性数组

### 匿名函数的典型用例？

* 立即执行函数，让变量不会泄露到全局范围内

* 作为只需要执行一次的回调函数，例如 `setTimeout`

* 函数式编程结构，例如`arr.map(function() {})`

### 解释 Ajax？

Ajax（异步 JavaScript 和 XML）是一组 Web 开发技术，在客户端使用许多 Web 技术来创建异步 Web 应用程序。使用 Ajax，Web 应用程序可以异步（在后台）向服务器发送数据和从服务器检索数据，而不会干扰现有页面的显示和行为。通过将数据交换层与表示层分离，Ajax 允许网页以及扩展的 Web 应用程序动态更改内容，而无需重新加载整个页面。在实践中，由于 JSON 是 JavaScript 原生的优势，现代实现通常使用 JSON 而不是 XML

### JSONP 是如何工作的？

JSONP 是一种绕过 Web 浏览器跨域策略的方法。因为 script 是允许跨域的，利用这一性质，前端通常会构造如下链接：

```html
<script>
  function printData(data) {
    console.log(`My name is ${data.name}!`);
  }
</script>

<script src="https://example.com?callback=printData"></script>
```
在服务端，会返回函数，并且把数据放在参数中：

```js
printData({ name: 'John' });
```

### 解释同步函数和异步函数的区别？

同步函数是阻塞的，如果其中一个语句花了很长的时间，程序的执行就会暂停

异步函数通常接受回调函数作为参数，并在完成时调用回调函数。回调仅在异步操作完成且调用堆栈为空时调用

### JavaScript中的不可变对象
在 JavaScript 中，一些内置类型（数字、字符串）是不可变的，但自定义对象通常是可变的，一些常见的不可变对象（immutability object）像 `Math`、`Date`

以下是在纯 JavaScript 对象上添加/模拟不变性的几种方法

**对象常量属性**

```js
let myObject = {}
Object.defineProperty(myObject, 'a', {
  value: 2,
  writable: false,
  configurable: false,
  enumerable: true
})
console.log(myObject.number); // 42
myObject.number = 43;
console.log(myObject.number); // 42
```

**阻止扩展**

```js
let myObject = {
  a: 2
}

Object.preventExtensions(myObject)
// it will throw an error in strict mode
myObject.b = 3
console.log(myObject.b) // undefined
```

**Seal**

防止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变

```js
let myObject = {
  property1: 42
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// expected output: 33

delete object1.property1; // cannot delete when sealed
```

**freeze**

不能添加新属性，不能修改现有属性的值，不能删除现有属性，以及将所有现有属性标记为不可配置。这对于确保数据不会被意外修改非常有用

```js
let immutableObject = Object.freeze({});
```

### attribute 和 property 的区别

attribute 是在 HTML 中定义的，property 是在 DOM 中定义的

有如下的例子：

```html
<input type="text" value="Hello">
```

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```
当尝试修改 input 输入框的值时，会发现两者的行为不同

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

### ajax 和 fetch 的优缺点

* fetch 只对网路请求报错，400，500 都当作成功
* fetch 默认不携带 cookie
* fetch 不支持 abort，所以不支持超时控制
* fetch [没法检测请求进度](https://peterroe.icu/posts/file-in-browser#%E8%BF%9B%E5%BA%A6%E7%9B%91%E6%8E%A7)

### 手写

const newFn = requestFn(fn,count,time)
实现requestFn,调用返回newFn可以做到fn每隔time时间执行一次, 供执行count次

```js
function requestFn(fn, count, time, immediately) {
  return () => {
    if(immediately) fn()
    let s = setInterval(() => {
      if(count > 0) {
        fn()
      } {
        clearInterval(s)
      }
    }, time)
  }
}
```

### 打平数组

在 JS 中，能打平一层数组的只有 `concat` 方法和 `...` 运算符，打平的核心都是基于这两种方式的。

```js
// 原理
[].push(...a)
[].concat(a)
```

但其实`...` 运算符只是语法糖，最终也是调用了 `concat` 方法：

```js
[...a] //=> [].concat(a)
[...a, ...b]  //=> a.concat(b)
```

**方法一：**

* 返回了新数组
* 稍加改造可以控制打平的层数

```js
let arr = [23,34,[45,56,[45]],34,[234,234]]
let res = []

function flatten(arr) {
  arr.forEach(it => {
    if(Array.isArray(it)) {
      flatten(it)
    } else {
      res.push(it)
    }
  })
}

flatten(arr)
```

方法二：

* 返回了新数组
* 稍加改造可以控制打平的层数

```js
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : [cur])
  }, [])
}
```

方法三：

* 返回了新数组
* 全部打平

```js
function flatten(arr) {
  arr.toString().split(',').map(it => +it)
}
```

### 排序

```js
// 时间：O(n)²
function bubbleSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    for(let j = 0; j < arr.length - 1 - i; j++) {
      if(arr[j] > arr[j + 1]) {
        let t = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = t
      }
    }
  }
}
```

### 局部排序

```js
function sortBetween(arr, i, j) {
  let interval = arr.slice(i, j + 1).sort((a, b) => a - b)
  arr.splice(i, j - i + 1, ...interval)
}
```