---
title: axios实现GET/POST
date: 2022-2-20
type: javascript
---

> 通常我们不会直接使用ajax，而是使用在此基础上扩展的axios

## 专用用法

用于发送专门的某种请求，例如`get/post`

```js
axios.get('http://localhost:5000')
  .then(value => {
    console.log(value)
  })

axios.post('http://localhost:5000/add', {
  name: 'peterroe'
  age: 20
}).then(value => {
    console.log(value)
})
```

## 通用用法

通用用法有着更强的灵活度

```js
axios({
  method: 'post', //or get、delete、options、put，etc.
  url: 'http://localhost:5000/add',
  data: {
    name: 'peter',
    age: 20
  }
}).then(value => {
    console.log(value)
})
```