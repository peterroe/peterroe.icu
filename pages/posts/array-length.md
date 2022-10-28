---
title: 怪异的数组长度
date: 2022-10-28
duration: 5min
---

> 数组长度在 JS 中表现有些怪异，本文整理一些容易遇到的疑惑之处

**负数下标**

给数组的负数下标赋值并不会报错，但是不会改变 `length` ，不过确实是有效的，可以用来储存一些值

```js
let a = []
a[-2] = 3

a.length // => 0
a[-2] // => 3 
```

**empty**

使用 `new` 操作符初始化数组的时候，可以传入 `length` 属性，代表初始化数组的长度：

```js
let a = new Array(3)

a //=> [empty × 3]
a.length //=> 3
```

上面看起来一切都符合预期，打印数组是三个 `empty`，数组的长度是3。但是会有一些怪异行为，如，**无法被迭代方法迭代**

```js
new Array(4).forEach(it => {
  // 这里不会被执行
})
```

这种情况下，需要填充数组，可以使用 `fill` 方法

```js
let a = new Array(3).fill() // 不传参数，填充的是undefined
a //=> [undefined, undefined, undefined]
a.map(it => {
  // 这个时候就可以被迭代
  console.log(it) 
})
```

关于 `empty`，还有另一个奇怪的相关的特性，当我们使用 `,` 创建数组的时候

```js
let a = [,,,]

a //=> [empty × 3]
a.length //=> 3
```

返回的是 3 个 `empty`，不是我们预期的 4 个，究其原因，其实可以理解为最后一个 `,` 的右边**不会被当作有效位置**

来看看这个例子或许就明白了

```js
let a = [1,2]
let b = [1,2,]
a //=> [1,2]
a.length //=> 2
b //=> [1,2]
b.length //=> 2

let c = [,]
c //=> [empty]
c.length //=> 1
```

总结：`empty` 不会被迭代，声明数组的最后一个逗号的右边位置无效

**改变数组长度**

通常来说，不建议直接通过赋值的方式改变数组长度，虽然它仍然是有效的

```js
let a = [1,2]
a.length = 5
a //=> [1, 2, empty × 3]
a.length //=>  5
```

上面长度改变了，但是产生了一些 empty ，如前面所说，它不会被迭代

```js
let a = [1,2]
a.length = 5

a.forEach(it => {
  // 自会被执行两次
  console.log(it) //=> 1 2
})
```

给数组元素赋值也有可能改变数组长度

```js
let a = [1,2]
a[4] = 10
a.length //=> 5
a.forEach(it => {
  // 会被执行三次
  console.log(it) //=> 1 2 10
})
```

数组也有一些正规方法也有可能改变数组长度，例如：

队列操作：`push、pop、shift、unshift`
批量增删元素：`splice`

**最佳实践**

* 含有 empty 的数组是不安全的，请尽量填充它
* 不要改变数组长度
* 不要给超边界的下标元素赋值
* 使用正规的方法改变数组长度