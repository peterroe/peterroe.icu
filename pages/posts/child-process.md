---
title: 初见 child_process
date: 2023-02-15
---

> 常用于在 JS 文件中执行 SHELL 命令

docs: https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback

### 一些方法

* `child_process.exec(command[, options][, callback])` (support Sync)
  * 生成一个 `shell` 然后`command`在该 `shell` 中执行，缓冲任何生成的输出。传递给 `exec` 函数的字符串`command`由 `shell` 直接处理，特殊字符（因 `shell`而异）需要相应处理
 
* `child_process.execFile(file[, args][, options][, callback])` (support Sync)
  * 该`child_process.execFile()`功能类似于，`child_process.exec()` 除了默认情况下它不生成 `shell`，因此不支持 `I/O` 重定向和文件通配等行为。

* `child_process.spawn(command[, args][, options])` (support Sync)
  * 该`child_process.spawn()`方法使用给定的生成一个新进程 `command`，命令行参数在`args`. 如果省略，`args`则默认为空数组

* `child_process.fork(modulePath[, args][, options])`
  * 该`child_process.fork()`方法是一种特殊情况， `child_process.spawn()`专门用于生成新的 `Node.js` 进程。像`child_process.spawn()`，`ChildProcess`返回一个对象。返回的`ChildProcess`将有一个额外的内置通信通道，允许消息在父子之间来回传递

推荐使用封装好的工具 <GitHubLink repo="sindresorhus/execa" />

### 关于颜色字符

`Node.js` 的控制台对象 `console` 提供了一些方法用于输出彩色和样式化的文本。这些方法基于 `ANSI` 转义序列，它们允许你通过添加控制字符来改变文本的颜色、背景颜色和样式。

以下是一些 `console` 对象中用于彩色和样式化输出的方法：

```js
console.log('\x1b[31m%s\x1b[0m', 'Hello, world!') // red
console.log('\x1b[32m%s\x1b[0m', 'Hello, world!') // green
console.log('\x1b[33m%s\x1b[0m', 'Hello, world!') // yellow
console.log('\x1b[34m%s\x1b[0m', 'Hello, world!') // blue
console.log('\x1b[35m%s\x1b[0m', 'Hello, world!') // purple
console.log('\x1b[36m%s\x1b[0m', 'Hello, world!') // cyan
console.log('\x1b[1m%s\x1b[0m', 'Hello, world!')  // bold
console.log('\x1b[4m%s\x1b[0m', 'Hello, world!')  // gray
```

**输出问题**

当打印由 `child_process` 执行完的 `stdout` 时候，带有颜色的输出会被抹去颜色

这是因为命令行命令在输出颜色时使用了终端特定的控制字符，而在 `Node.js` 中通过 `child_process` 模块执行命令时，默认情况下不会传递终端信息，因此控制台不知道如何解释这些控制字符。为了解决这个问题，你可以在执行命令时增加一个 `stdio` 选项，并将其设置为 `'inherit'`，这将会将命令的标准输出和标准错误直接传递到当前进程的控制台，从而保留输出中的颜色信息

为了解决这个问题，你可以在执行命令时增加一个 stdio 选项，并将其设置为 'inherit'，这将会将命令的标准输出和标准错误直接传递到当前进程的控制台，从而保留输出中的颜色信息，例如：

```js
const { spawn } = require('child_process');
spawn('git', ['log', '--graph'], {
  stdio: 'inherit',
})
```

而 `child_process.exec()` 方法并不支持直接将子进程的输出流传递给父进程的输出流，而是将其存储在一个缓冲区中，并将其作为回调函数的参数之一返回。