---
title: 单条语句轮转数组
date: 2022-01-04
type: javascript
---

技巧：

```js
nums.unshift(...nums.splice(len))
```

例如：

```js
let arr = [1, 2, 3, 4, 5, 6, 7]

arr.unshift(...nums.splice(3))

arr //=> [4, 5, 6, 7, 1, 2, 3]
```