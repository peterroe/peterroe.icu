---
title: Gist
subtitle: Nice code
---

### node 清空文件夹

```js
function emptyDir(dir: string) {
  if(!fs.existsSync(dir))
    return
  for(const file of fs.readdirSync(dir)) {
    if(file === '.git')
      continue
    fs.rmSync(
      resolve(dir, file, {
        recursive: true,
        force: true
      })
    )
  }
}
```

### open

Nodejs 跨平台打开网页。也有封装好的库，例如 [`open`](https://github.com/sindresorhus/open)

```js
const c = require('child_process')
const map = {
  wind32: 'start',
  linux: 'xdg-open',
  darwin: 'open'
}
const cmd = process.platform[map]

const url = 'https://peterroe.icu' // 指定 url
c.exec(`${cmd} "${url}"`);
```

### rgbToHex

```js
const rgbToHex = (r, g, b) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

rgbToHex(255, 101, 47)
//=> #ff652f
```

### randomHexColor

随机颜色

```js
const randomHexColor = `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`

randomHexColor()
//=>  #2bc5f2 (Maybe)
```

### horseAge

标签函数

```js
function horseAge(str, age) {
  const ageStr = age > 5 ? 'old' : 'young'
  return `${str[0]}${ageStr} at ${age} years`
}

const bio2 = horseAge`This horse is ${7}`
```

### someComplexValue

如果一个值需要复杂的计算得出，而且计算方式不被复用。就可以用一次性的函数包裹

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

### __dirname

ESM 下的 __dirname

```js
const __dirname = fileURLToPath(new URL('.', import.meta.url))
```