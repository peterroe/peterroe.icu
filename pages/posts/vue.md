---
title: 简单聊聊Vue
date: 2022-09-10
duration: 10min
---

[[toc]]

在 Vue 之前，不管是原生 JS 还是 JQuery，都是通过声明式的方式来操作 DOM，这种方式会假设我们已经有一个 HTML 结构，然后通过 JS 来捕获元素节点，从而操作 DOM 更新

```js
$("#xxx").text("xxx");
document.querySelector("#xxx").textContent = "xxx";
```

例如：

```html
<body>
  <div>
    <h1>Hello</h1>
    <p>Welcome to my website </p>
  </div>
</body>
<script src="./index.js"></script>
```

> 上面的代码告诉我们，我们是先有了视图，然后再通过JS的操作进行 UI 的修改

---


而 Vue 的思想在于，我们预先想到了当前页面会由哪些变量决定，这些变量的改变会影响页面UI的变化

那我们把这些变量抽象成一个个的**状态**，然后通过状态的改变来更新页面，这样就不需要我们去操作 DOM 了，Vue 会自动帮我们更新页面

```js
const state = {
  title: "Hello",
  content: "Welcome to my website",
};

const view = render(state)
```

当然，状态和视图**不是**直接的映射关系，所以我们需要编写一套模版， 在 Vue 中叫做 Template

```html
<template>
  <div>
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </div>
</template>
```

现在有了状态和模版，我们就可以结合起来，生成一个视图

```sh
view = template + state
```

如何让 state 变化的时候， view 也同时更新呢？

```js
const state = {
  title: "Hello",
  content: "Welcome to my website",
};

const view = render(state)


state.title = "Hello World"
// How to update view?
```

## Vue核心原理

仅仅改变了一个属性的值，却触发了视图的更新或者说其他代码的执行，在 JS 中，只有两个特性可以做到这一点

一个是 Object.defineProperty，另一个是 Proxy，分别对应了 Vue2 和 Vue3 的核心实现

```js
const state = {}

let title = "Hello"
Object.defineProperty(state, 'title', {
  get() {
    return title
  }
  set(val) {
    title = val
  }
})
```
当我们设置/获取属性值的时候，对应的 set/get 方法就会被触发，所以我们可以在这两个函数内调用其他的JS代码。比如**更新视图**的逻辑

我们现在已经知道了，改变状态后，如何让我们的更新视图的逻辑触发，但我们可能会更加好奇，Vue 的源码是如何实现这一个功能的？

## 第一次渲染

很多人会搞混一点，认为在 vue 中编写的 template 是 html。虽然他们看起来结构很像，但是 template 实际上只是普通的字符串。

html 可以通过浏览器自带的功能解析为 DOM 节点。而我们还需要编写一个逻辑，将 template 映射转换成真正的 DOM

这个过程的**前一步**就叫做**模版编译**

我们来看这个 HTML 结构：

```html
<div>
  <h1>Hello</h1>
  <p>Welcome to my website</p>
</div>
```

你可以用 JS 来描述上面的 HTML 结构吗？

实际上比较是容易的：

```js
const o = {
  tag: 'div',
  children: [
    {
      tag: 'h1',
      children: 'Hello'
    },
    {
      tag: 'p',
      children: 'Welcome to my website'
    }
  ]
}
```

用 JS 描述的好处是， 我们可以很容易对二者相互转换

<img src="https://img-blog.csdnimg.cn/cfd127fb5c724d4a954010879b1e1099.png" border rounded-2 p-3/>

上面的 `o` 对象，会留在内存中，帮助我们保存当前的状态，当状态发生变化的时候，我们可以通过对比新旧状态，来更新视图。这个对象叫做 **visual DOM**

通过**模版编译**并且注入我们定义的状态变量值，生成虚拟DOM，到再映射回去形成真正的 DOM

## 第N次渲染

第一次渲染看起来是容易理解的，但是我们不可避免会去更新状态，触发新的渲染，而之后的渲染，涉及到**前后状态的改变**

如果我们用最简单的方法，我们当然可以通过 template 和新的 state，重新进行一次新的渲染。

但我们有更好的方法，由于第一次渲染已经创建了一个 DOM 结构，我们是否可以直接对这个 DOM 结构进行修改呢？

是的，这样是可行的，经验告诉我们，大多时候，我们改变的状态只会影响视图的一部分（经常是一小部分），那就意味着前后两次视图的变化不大，我们通过对比新旧状态，来更新视图是很有意义的。这样可以**减少 DOM 的操作**，提高性能。

## Diff算法

回到我们之前的假设，我们将 title 改为了 Hello World

```js
const state = {
  title: "Hello",
  content: "Welcome to my website",
};

const view = render(state)


state.title = "Hello World"
// How to update view?
```

所以实际上我们会得到一个新的 visual DOM

```js
const oldVisualDom = {
  tag: 'div',
  children: [
    {
      tag: 'h1',
      children: 'Hello'
    },
    {
      tag: 'p',
      children: 'Welcome to my website'
    }
  ]
}

const newVisualDom = {
  tag: 'div',
  children: [
    {
      tag: 'h1',
      children: 'Hello World'
    },
    {
      tag: 'p',
      children: 'Welcome to my website'
    }
  ]
}
```

上面两个对象的diff，是最简单的一种情况，我们只需要把视图中的 h1 标签的内容改为 Hello World 就可以了

```js
document.querySelector('h1').innerText = 'Hello World'
```

但实际情况中会遇到：前后节点数量不同、前后同一个位置但是不是同一个节点等情况，这里不展开描述了

## 生命周期

待更新。。。