---
title: Gist
subtitle: Nice code
---

### Invalid Char

具体来说，它匹配以下范围内的字符：

* \u0000-\u001F：ASCII 控制字符，包括空字符、水平制表符、换行符、回车符等。
* "#$&*+,/:;<=>?@[\]^{|}\u007F`：一些特殊字符，包括双引号、井号、美元符号、星号、加号、逗号、斜杠、冒号、分号、小于号、等于号、大于号、问号、商业符号、左方括号、反斜杠、右方括号、脱字符、反引号、左花括号、竖线、右花括号和删除字符。
  
这些字符通常被认为是无效字符，因为它们可能会引起一些安全问题或者在传输过程中出现问题。因此，这个正则表达式通常用于过滤或清理用户输入的字符，以确保输入的内容是安全和合法的。

```js
const INVALID_CHAR_RE = /[\u0000-\u001F"#$&*+,/:;<=>?@[\]^`{|}\u007F]+/g;
```

### Readable

```js
const fs = require('fs');
const { Readable } = require('stream');

// 创建一个可读流
const readableStream = new Readable({
  read(size) {
    // 您可以在这里生成或读取数据
    // 然后使用 this.push(data) 将数据推送到可读流中
    // 当没有更多数据可读时，使用 this.push(null) 结束流

    // 示例：将字符串 'Hello, World!' 推送到可读流中
    this.push('Hello, World!');
    this.push(null);
  }
});

// 创建一个可写流，将数据写入 'output.txt' 文件
const writableStream = fs.createWriteStream('output.txt');

// 将可读流的数据传递给可写流
readableStream.pipe(writableStream);

// 监听 'finish' 事件以获取写入完成的通知
writableStream.on('finish', () => {
  console.log('Data has been successfully written to the file.');
});
```

### image

```html
<div class="stage">
  <div class="actor"></div>
  <div class="actor"></div>
  <div class="actor"></div>
</div>

<style>
body {
  background: #000;
}

.stage {
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
}

.actor {
  animation: kenburns 30s linear infinite;
  background-size: cover;
  background-position: 50%;
  height: 100vh;
  inset: 0;
  opacity: 0;
  position: absolute;
  scale: 1.2;
  width: 100vw;
}

.actor:nth-child(1) {
  background-image: url("https://images.unsplash.com/photo-1504221507732-5246c045949b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1MjE&ixlib=rb-4.0.3&q=80");
}
.actor:nth-child(2) {
  animation-delay: 10s;
  background-image: url("https://images.unsplash.com/photo-1595131838595-3154b9f4450b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1MjE&ixlib=rb-4.0.3&q=80");
}
.actor:nth-child(3) {
  animation-delay: 20s;
  background-image: url("https://images.unsplash.com/photo-1618331835717-801e976710b2?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1NjU&ixlib=rb-4.0.3&q=80");
}

@keyframes kenburns {
  25% {
    opacity: 1;
  }

  50% {
    opacity: .8;
    scale: 1;
  }

  60% {
    opacity: 0;
  }
}
</style>
```

### css svg filter

```html
<style>
#app {
  filter: url(#squiggle)
}
</style>
<div id="app">hello<div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
  <defs>
    <filter id="squiggle">
      <feTurbulence type="fractalNoise" id="turbulence" baseFrequency=".05" numOctaves="4" />
      <feDisplacementMap id="displacement" in="SourceGraphic" scale="4" />
    </filter>
  </defs>
</svg>
```

### hash link smooth

```js
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      })
    })
  })
```

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