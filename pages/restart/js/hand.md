[[toc]]

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
// 时间：O(n)
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