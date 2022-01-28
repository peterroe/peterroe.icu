---
title: 实现最简async/await
date: 2022-01-29
type: javascript
---

```js
function g(num) {
  return new Promise(res => {
    setTimeout(() => {
      res(num * 2)
    }, 1000)
  })
}


function* generate() {
  const value = yield g(1)
  const value1 = yield g(value)
  const value2 = yield g(value1)
  return value2
}

function generateToAsync(generate) {
  return function() {
    return new Promise(res => {
      const g = generate()
      const next1 = g.next()
      next1.value.then(res1 => {
        const next2 = g.next(res1)
        next2.value.then(res2 => {
          const next3 = g.next(res2)
          next3.value.then(res3 => {
            res(next3.value)
          })
        })
      })
    })
  }
}

generateToAsync(generate)().then(value => {
  console.log('%c [ value ]-71', 'font-size:13px; background:pink; color:#bf2c9f;', value)
})
```