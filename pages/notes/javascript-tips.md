---
title: JavasScript技巧
date: 2022-03-14
type: javascript
---

[[toc]]

## 数组

### 轮转数组

```js
nums.unshift(...nums.splice(len))
```

### nlogn复杂度洗牌

```js
nums.sort(_ => Math.random() - 0.5)
```

### 简洁赋值

```js
let [a, b, c] = [1, 2, 3]
```

---

## 浏览器

### 容器平滑滚动（非IOS）

```js
document.querySelector('#app').scrollIntoView({
  behavior: 'smooth',
  block: 'start' //start顶部， end底部
})
```

## 数字

### 获得随机hex颜色

```js
Math.floor(Math.ramdon() * 0xffffff).toString(16) //3b8d2a
```

## 骚操作

### 同步阻塞

```js
let delay = 1000
let start = +new Date()
while(+new Date() < start + delay) {
  continue;
}
```

### 星级评分

```js
let score = 3
'★★★★★✰✰✰✰✰'.slice(5 - score, 10 - score)
```