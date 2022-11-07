---
title: Gist
---

```js
const rgbToHex = (r, g, b) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

rgbToHex(255, 101, 47)
//=> #ff652f
```
---
```js
const randomHexColor = `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`

randomHexColor()
//=>  #2bc5f2 (Maybe)
```

---

```js
function horseAge(str, age) {
  const ageStr = age > 5 ? 'old' : 'young'
  return `${str[0]}${ageStr} at ${age} years`
}

const bio2 = horseAge`This horse is ${7}`
```
---
```js
const someComplexValue = (() => {
  const a = 10
  const b = 20

  if(a > b) {
    return a * b
  }
  
  return b / a
})()
```
---
```js
const __dirname = fileURLToPath(new URL('.', import.meta.url))
```