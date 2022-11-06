---
title: 回调函数的妙用
date: 2022-11-05
---

印象中，回调函数作用是，传入另一个函数，然后另一个函数可以根据情况，选择合适的时机调用这个回调函数，例如:

```js
function compute(a, b, cb) {
  if(a > b) {
    const sum = a + b
    cb(sum)
  } else {
    const gap = a - b
    cb(gap)
  }
}

function main() {
  let a = 10
  let b = 20
  compute(a, b, (c) => {
    console.log(`Answer: ${c}, over!`)
  })
}
```

实际上，上面的例子并没有证明回调函数的好处，因为也可以不使用回调函数，而是像下面这样写：

```js
function main() {
  let a = 10
  let b = 20
  const c = compute(a, b)
  console.log(`Answer: ${c}, over!`)
}
```

我们发现，使用**同步回调函数**场景下，都是可以有不使用的方案来替代，无非就是写法差异，似乎并没有带来实质性的好处

那回调函数有什么好处呢？

---

### 作用域的管理

几天前，在编写一个程序的时候，有一个问题使我十分困扰

因为我们想要将大功能拆分成一个个小功能，目的是为了逻辑清晰，易于组合，所以需要将代码提取为「函数」，进行封装操作

而将代码封装为一个个的函数，必然也会把作用域给分隔开，所以变量的使用不是很方便，调用函数的时候，当成参数传入，内部才能使用到外部的这个变量：

```js
// 模块化前
function main() {
  let a = 10
  let b = 20
  let c = 30
  const sum = a + b
  console.log(`a + b == b ?, ${c == sum}`)
}

// 模块化后
function computeSum(a, b, c) {
  const sum = a + b
  console.log(`a + b == b ?, ${c == sum}`)
}
function main() {
  let a = 10
  let b = 20
  let c = 30
  computeSum(a, b, c)
}
```

上面的例子看到了吗，模块化前，写起来很爽，变量都在全局作用域。而模块化之后，不得不传入「c」变量进入函数

明显感觉到传入变量「c」让人很不爽，因为这次传递并没有起太大的作用，反而让「c」变量的“生命线”延长进入到了另一个函数
。假如「c」是一个对象的话，这种影响更加深远

当我们改造成回调函数后：

```js
function computeSum(a, b, cb) {
  const sum = a + b
  cb(sum)
}

function main() {
  let a = 10
  let b = 20
  let c = 30
  computeSum(a, b, (answer) => {
    console.log(`a + b == b ?, ${c == answer}`)
  })
}
```

可以看到，在这个回调函数中

```js
(answer) => {
  console.log(`a + b == b ?, ${c == answer}`)
}
```
既需要使用来自`computeSum`函数作用域中的 `answer`，也需要使用来自`main`函数作用域中的`c`，但却没有多余的函数参数传输，也满足模块化的原则，太妙了！

或许有人会反驳像下面这样，不使用回调函数更加简单：

```js
function computeSum(a, b, cb) {
  const sum = a + b
  return sum
}

function main() {
  let a = 10
  let b = 20
  const c = computeSum(a, b)
  console.log(`Answer: ${c}, over!`)
}
```

但是，回调函数还可以更加灵活，例如在多回调函数场景下，`compute` 可以灵活选择调用哪一个函数，以及传入哪些参数给回调函数

```js
function main() {
  const c = compute(
    (a, b) => {
      // 逻辑A
    }, (c, d, e) => {
      // 逻辑B
    }
  )
}
```

相比之下，普通调用就显得混乱臃肿：

```js
function main() {
  const { a, b, c, d, e, isTrue } = compute()
  if(isTrue) {
    // 逻辑A
  } else {
    // 逻辑B
  }
}
```