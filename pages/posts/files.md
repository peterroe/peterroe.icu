---
title: 文件系统
---

## Promise

现在你可以通过这种方式使用 fs，不用手动封装成 Promise 了

```js
import { promises as fs } from 'fs'

// await fs.readFile
```

## 常用 API

```js
// 拷贝文件
fs.copyFile('./m3.js', './m4.js')
fs.cp('./m3.js', './m4.js')

// 创建目录
fs.mkdir('test')

// 读取目录
fs.readdir('./')

// 检查文件是否存在
fs.existsSync('.git')
```