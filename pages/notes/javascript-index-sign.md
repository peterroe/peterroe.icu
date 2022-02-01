---
title: JavaScript索引签名
date: 2022-02-01
type: javascript
---

> => 符号代表输出了...

一般情况下，普通对象的**键**都是**字符串**

```js
const s = 'name'
const o = {}

o[s] = 'peterroe'

console.log(s.name) //=> peterroe
```

上面的情况用到了**计算属性**，通过`[]`符号，访问用户某个键的值

但是当`s`不是一个字符串，而是一个对象的时候，那么计算`[s]`的值是通过调用`s.toString`方法得到**返回值**，**返回值**作为计算出来的键

```js
const s = {
  toString() {
    console.log('hello, world')
    return 'name'
  }
}

const o = {}

//隐式调用了s.toString()
o[s] //=> hello, world

//隐式调用了s.toString()，并声明了键的值
o[s] = 'peterroe' //=> hello, world

console.log(o.name) //=> 'peterroe' 
```

## In Typescript

为了安全，在`ts`中，我们必须得显式调用`toString`方法

```js
o[s] // Error

o[s.toString()] // Right
```