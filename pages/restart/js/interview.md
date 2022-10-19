[[toc]]

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

遍历对象的可枚举属性，包括原型链上的可继承的属性(enumerable)，所以通常可以加上 `Object.hasOwn()`判断

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