---
title: Ajax实现GET/POST
date: 2022-02-20
type: javascript
---

> 体验最原始的request方法

## 实现GET

```js
const xhr = new XMLHttpRequest()

xhr.onreadystatechange = function() {
  if(xhr.readyState == 4) {
    console.log(xhr.responseText)
  }
}

xhr.open('get', 'http://localhost:5000')

xhr.send()
```

## 实现POST

```js
const xhr = new XMLHttpRequest()

xhr.onreadystatechange = function() {
  if(xhr.readyState == 4) {
    console.log(xhr.responseText)
  }
}

xhr.open('post', 'http://localhost:5000/add')
//必须设置请求格式
xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
//参数通过send发送
xhr.send('name=peterroe&age=12')
```

**附:测试NodeJs**

```js
const app = require('express')()
const cors = require('cors')
const bodyparser = require('body-parser')

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.post('/add', (req, res) => {
  console.log(req.body)
  res.send('World')
})

app.listen(5000, () => {
  console.log('5000监听中')
})
```