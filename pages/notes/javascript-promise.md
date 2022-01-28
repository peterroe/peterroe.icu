---
title: 实现最简Promise
date: 2022-01-28
type: javascript
---

* 没有处理发生异常时，当作`reject`处理的情况
* 只是简单将`then`的返回值用`Promise`包裹
* 没有参数验证

```js
class MyPromise {
  constructor(executor) {
    this.initValue()
    this.initBind()
    executor(this.resolve, this.reject)
  }
  initValue() {
    this.value = undefined
    this.state = 'pending'
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
  }
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve(value) {
    this.state = 'fulfilled'
    this.value = value

    while (this.onFulfilledCallback.length) {
      this.onFulfilledCallback.shift()(this.value)
    }
  }
  reject(reason) {
    this.state = 'rejected'
    this.value = reason
    while (this.onRejectedCallback.length) {
      this.onRejectedCallback.shift()(this.value)
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((res, rej) => {
      if (this.state == 'pending') { //the 'pending' state indicates that it has not been processed.
        this.onFulfilledCallback.push(onFulfilled.bind(this))
        this.onRejectedCallback.push(onRejected.bind(this))
        res(undefined)
      } else if (this.state == 'fulfilled') {
        process.nextTick(() => {  //micro task exec
          const value = onFulfilled(this.value)
          res(value)
        })
      } else {
        process.nextTick(() => {  //micro task exec
          const value = onRejected(this.value)
          res(value)
        })
      }
    })
  }
}

//tests
setImmediate(() => {
  console.log(6)
})
console.log(1)
new MyPromise((res, rej) => {
  console.log(2)
  rej('content')
}).then(() => {}, value => {
  console.log(4, value)
  return 5
}).then(value => {
  console.log(5, value)
})
console.log(3)
```

结果：

```shell
1
2
3
4 content
5 5
6
```