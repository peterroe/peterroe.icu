---
title: JavaScript函数调用栈
date: 2022-01-24
type: javascript
---

<img src="https://static001.geekbang.org/resource/image/06/13/0655d18ec347a95dfbf843969a921a13.png" />

执行js代码的过程中，会产生两种执行上下文

* 全局执行上下文
* 函数执行上下文

执行全局代码的时候，提前通过预解析生成全集执行上下文，然后将它压入调用栈当中

<img src="https://static001.geekbang.org/resource/image/a5/1d/a5d7ec1f8f296412acc045835b85431d.png" />

调用函数时候，js引擎会编译该函数，生成函数执行上下文，并压入调用栈当中

我们可以通过如下的实验看到浏览器中的调用栈

<img src="https://img-blog.csdnimg.cn/a0e78f855bef432792428838e58e9281.png" />

每个调用栈都保存着自己的变量环境

<div grid grid-cols-3>
  <img src="https://img-blog.csdnimg.cn/c3498861668b43869413dff12dd2a574.png" />
  <img src="https://img-blog.csdnimg.cn/18f52f2c0bd5423e8315f3c3b1ef926d.png" />
  <img src="https://img-blog.csdnimg.cn/594cd548a2ae4facba52e018701ebe5e.png" />
</div>

## 执行上下文

上文说到，当某个函数执行的时候，会为该函数创建执行上下文

变量环境属于执行上下文中的一部分，实际上，**执行上下文**由四部分组成

* 变量环境
* 词法环境
* outer
* this

<img src="https://static001.geekbang.org/resource/image/b3/8d/b398610fd8060b381d33afc9b86f988d.png" />

**变量环境**

变量环境中的变量在预编译的时候就决定了，通过`var`声明的变量会被放在变量环境当中

**词法环境**

词法环境中的变量都是通过`let`或`const`声明的。但是还要具体分为两类，**顶级函数作用域中的和块级**声明的

```js
function foo(){
    var a = 1
    let b = 2
    {
      let b = 3
      var c = 4
      let d = 5
      console.log(a)
      console.log(b)
    }
    console.log(b) 
    console.log(c)
    console.log(d)
}   
foo()
```

如上的代码将会生成如下的执行上下文

<img src="https://static001.geekbang.org/resource/image/7e/fa/7e0f7bc362e0dea21d27dc5fb08d06fa.png" />

变量查找过程：

<img src="https://static001.geekbang.org/resource/image/06/08/06c06a756632acb12aa97b3be57bb908.png" />

**outer**

指向全局对象

**this**

`this`的指向是一个老生常谈的问题，实际上，它也可以被分为几种简单的情况

1. 默认的this指向windows

```js
console.log(this) //window
function foo() {
  console.log(this) //window
}
foo()
```

2. 显式绑定this

```js
let name = 'roe'
let o = {
  name: 'peter'
}
function bar() {
  console.log(this.name)
}
bar.call(o) //=> ouput: peter

//another situation
function Person() {
  this.name = 'peterroe'
}
new Person().name //=> output: peterroe
```

3. 对象调用方法

先来看一个示例：

```js
let name = 'hello'
let o = {
  name: 'world',
  getName: function() {
    console.log(name)  //=>output: hello
  }
}
```

你会发现上面的输出不是`world`，这种情况就是我们为什么要使用`this`的原因，因为实际上，一个对象的方法里面调用这个对象的属性是很常见的，由于词法作用域的限制，难以获得理想的情况

```js
let o = {
  name: 'world',
  getName: function() {
    console.log(name)  //=>output: world
  }
}
```

