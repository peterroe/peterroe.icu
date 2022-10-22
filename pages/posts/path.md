---
title: FilePath in NodeJs
date: 2022-10-21
duration: 5min
---

[[toc]]

> NodeJs 中的文件路径操作有很多方法，这里整理一下常用的用法以及区别

关于文件地址的各个部分有标准的叫法，我们日后最好也参照这种方式命名：

* base: 形如 `index.html`
* dir: 形如 `/home/user/dir`
* ext: 形如 `.html`
* name: 形如 `index`
* file: 形如 `/home/user/dir/index.html`

## Path

截取文件地址的各个部分：

```js
path.basename('/foo/bar/baz/quux.html') //=> 'quux.html'
path.dirname('/foo/bar/baz/quux.html') //=> '/foo/bar/baz'
path.extname('/foo/bar/baz/quux.html') //=> '.html'
```

合成/拆分文件地址：

```js
path.format({
  root: '/',
  dir: '/files/bar',
  name: 'foo',
  ext: '.ts'
}) //=> '/files/bar/foo.ts'
path.parse('/files/bar/foo.ts')
/* =>
{
  root: '/',
  dir: '/files/bar',
  base: 'foo.ts',
  ext: '.ts',
  name: 'foo'
}
*/
```

判断是否是绝对路径

```js
path.isAbsolute('/foo/bar');   // true
path.isAbsolute('/baz/..');    // true
path.isAbsolute('C:\\Admin');  // true
path.isAbsolute('qux/');       // false
path.isAbsolute('.');          // false
```

合并路径：

```js
path.join('/foo', '/bar'), //=> '/foo/bar'
path.resolve('/foo', '/bar') //=> '/bar'
```

::: info
`join`和`resolve`的区别在于：`resolve` 解析路径多方式像 `cd` 命令，而 `join` 只是简单的拼接路径
:::

找出相对路径：

```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// => '../../impl/bbb'
```

## 获取当前文件的绝对路径

`import.meta.url` 可以获得当前文件的地址，但是会带上 `file` 协议

```js
const url = import.meta.url
console.log(url) //=> file:///Users/peter/learn-nodejs/path/pages/posts/path.md
```

可以使用 `fileURLToPath` 去除 `file`协议：

```js
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
//=> /Users/peter/learn-nodejs/path/pages/posts/path.md

// 还可以通过dirname方法，就得到了ESM中的__dirname
const __dirname = path.dirname(__filename)
//=> /Users/peter/learn-nodejs/path/pages/posts
```

如果不想这么麻烦，也还有其他方式供选择：

```js
process.cwd() //=> /Users/peter/learn-nodejs/path
path.resolve() //=> /Users/peter/learn-nodejs/path
```

::: info
值得注意的是，`process.cwd()` 和 `path.resolve()` 返回的是当前进程的工作目录，而不是当前文件的目录
:::

这意味着假如现在我们的目录结构是这样的：

```shell
project
  ├─ pages
  ├─ src
  │   └─ index.js
  └─ package.json
```

如果在 project 目录下面执行 `node src/index.js`

```bash
lsh@lsh:/project$ node src/index.js
```

则 `process.cwd()` 和 `path.resolve()` 将会返回进程所在的目录，即 `/project`，而不是 `/project/src`，这与 `__dirname` 的表现是不一样的

> 如果你正在写一个NodeJs cli 工具，那么 `process.cwd()` 将会是你的最佳选择

## 获取某个文件的绝对路径

「某个」指的意思是，你知道这个文件的相对路径，但是不知道它的绝对路径，可以用到 `path.resolve` 方法：

```js
path.resolve('./src/index.ts') //=> /Users/peter/learn-nodejs/path/src/index.ts
```

除此外，还有一个类似的但更加严格的方法，但属于 `fs` 模块，叫做 `fs.realpath`，它的作用是返回一个文件的真实路径

```js
// 如果文件不存在，会抛出异常
fs.realpath('./src/index.ts') //=> /Users/peter/learn-nodejs/path/src/index.ts
```

## Home Directory

获取用户的 home 目录：

```js
const home = process.env.HOME //=> /Users/peter
```

有的时候，我们需要获取用户的 home 目录，但是这个环境变量并不是所有系统都有的，所以我们需要做一些兼容性处理：

```js
import { homedir } from 'os'

homedir() //=> /Users/peter
```

当然，大多数时候使用上面第一种方式获取就可以了，或者，再兼容一下平台：

```js
const home = process.platform === 'win32'
  ? process.env.USERPROFILE
  : process.env.HOME
```

之所以需要获取 Home 目录，是因为我们可能需要在用户的 Home 目录下面创建一些文件，用于存储一些配置信息。多数命令行工具的相关配置都是储存在这里的

比如 `.nvm`，`.npmrc`，`.gitconfig`，`.zshrc` 等等。