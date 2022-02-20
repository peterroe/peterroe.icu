---
title: fetch实现GET/POST
date: 2022-02-20
type: javascript
---

**最简实现:**

```js
//get
fetch('http://localhost:5000')
  .then(response => response.json())
  .then(value => console.log(value))


//post
fetch('http://localhost:5000/add',{
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'name=peter&age=20'
}).then(response => response.json())
  .then(value => console.log(value))
```