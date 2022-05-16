---
title: Packages
subtitle: npm packages
---

[[toc]]

Gather some npm packages

### TDD ---> 一些测试框架

<GitHubLink repo="avajs/ava" /> <GitHubStar repo="avajs/ava" />

<GitHubLink repo="facebook/jest" /> <GitHubStar repo="facebook/jest" />

<GitHubLink repo="mochajs/mocha" /> <GitHubStar repo="mochajs/mocha" />

<GitHubLink repo="substack/tape" /> <GitHubStar repo="substack/tape" />

<GitHubLink repo="lukeed/uvu" /> <GitHubStar repo="lukeed/uvu" />

```shell
~> "ava"   took   594ms  (  ???  )
~> "jest"  took   962ms  (356  ms)
~> "mocha" took   209ms  (  4  ms)
~> "tape"  took   122ms  (  ???  )
~> "uvu"   took    72ms  (  1.3ms)
```


---

### zod ---> 类型校验和提示 <GitHubStar repo="colinhacks/zod" />

像正则表达式的作用，但写起来要轻松许多，校验支持也更加丰富，而且更简单。

```ts
import { z } from 'zod'

const mySchema = z.string({
  invalid_type_error: 'name必须是字符串',
})

mySchema.parse('123')  // '123'
mySchema.parse(123)  // throw Error

mySchema.safeParse('123') // { success: true, data: '123' }
mySchema.safeParse(123); // => { success: false; error: ZodError }
```

地址：<GitHubLink repo="colinhacks/zod" />

相似项目：<GitHubLink repo="chaijs/chai" />

---

### pretty-bytes ---> 字节格式化处理 <GitHubStar repo="sindresorhus/pretty-bytes" />

```ts
import prettyBytes from 'pretty-bytes';

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'
```

地址：<GitHubLink repo="sindresorhus/pretty-bytes" />

---

### tiny-glob ---> 高效的文件glob匹配 <GitHubStar repo="terkelg/tiny-glob" />


```ts
import glob from 'tiny-glob'

(async() => {
  let files = await glob('test/*/*.{js,md}');
  console.log(files)
  //=> [ 'test/README.md', 'test/webpack.config.js' ]
})()
```

地址：<GitHubLink repo="terkelg/tiny-glob" />

相似项目：<GitHubLink repo="mrmlnc/fast-glob" />

---

### turborepo ---> monorepo脚手架 <GitHubStar repo="vercel/turborepo" />

快速创建一个基于`React`的`monorepo`项目：

```shell
$ npx create-turbo@latest
```

地址：<GitHubLink repo="vercel/turborepo" />

---

### lz-string ---> 字符串压缩 <GitHubStar repo="pieroxy/lz-string" />

主要是用于解决例如`localStorage`等场景下的储存空间不足问题，通过压缩算法进行压缩后再储存。

```ts
import LZString from 'lz-string';

var string = "This is my compression test.";
console.log(string.length);  //=>28

var compressed = LZString.compress(string);
console.log(compressed.length); //=> 16

string = LZString.decompress(compressed);
console.log("Sample is: " + string);
```

支持命令行用法：

```shell
$ npm install -g lz-string
$ lz-string index.ts > test.txt
```

地址：<GitHubLink repo="pieroxy/lz-string" />

---

### zustand ---> React状态管理库 <GitHubStar repo="pmndrs/zustand" />

相比于`Redux`: 

* 简单
* 使钩子成为消费状态的主要手段
* 不会将您的应用程序包装在上下文提供程序中
* [可以暂时通知组件（不导致渲染）](https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes)

地址：<GitHubLink repo="pmndrs/zustand" />

---

### fake-indexeddb ---> 用JS轻松操作 IndexedDB <GitHubStar repo="dumbmatter/fakeIndexedDB" />

```ts
import "fake-indexeddb/auto"

var request = indexedDB.open("test", 3);
request.onupgradeneeded = function () {
  var db = request.result;
  var store = db.createObjectStore("books", {keyPath: "isbn"});
  store.createIndex("by_title", "title", {unique: true});

  store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
  store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
  store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
}
```

地址：<GitHubLink repo="dumbmatter/fakeIndexedDB" />

相似项目：<GitHubLink repo="jakearchibald/idb-keyval" />

---

### stitches ---> CSS-in-js 方案（React）<GitHubStar repo="modulz/stitches" />

有着非常灵活的`CSS`配置，在继承、主题、全局场景下支持很好，适用于`CSS属性`切换频率高的项目

```tsx
const Button = styled('button', {
  backgroundColor: 'gainsboro',
  borderRadius: '9999px',
  fontSize: '13px',
  border: '0',
});

() => <Button>Button</Button>;
```

地址：<GitHubLink repo="modulz/stitches" />

---

### Radix-ui ---> 交互体验极佳的react的UI框架 <GitHubStar repo="radix-ui/primitives" />

支持键盘导航、焦点管理、屏幕阅读器测试。支持**鼠标右键下拉菜单**，原生推荐单组件使用：

```shell
$ npm install @radix-ui/react-context-menu
$ npm install @radix-ui/react-hover-card
```

地址：<GitHubLink repo="radix-ui/primitives" />

---

### fuite ---> 检测内存泄露工具 <GitHubStar repo="nolanlawson/fuite" />

原理：通过使用`Puppeteer`启动`Chrome`，模拟点击页面上的各个链接，再返回，检测内存大小的变化

```shell
$ npm install -g fuite
$ fuite https://www.baidu.com
```

地址：<GitHubLink repo="nolanlawson/fuite" />

---

### caxa ---> 将js脚本打包成exe程序 <GitHubStar repo="leafac/caxa" />

示例：在`src`文件夹下，新建`index.js`，编写内容后执行：

```shell
npm install -g caxa
$ caxa --input "./src" --output "hello.exe" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/index.js"
```

即生成`exe`程序

地址：<GitHubLink repo="leafac/caxa" />

---

### pkg ---> 将js脚本跨平台打包（windows、mac、linux）<GitHubStar repo="vercel/pkg" />

打包编写好的`log.js`只需要执行：

```shell
$ npm install -g pkg
$ pkg ./log.js 
# => log-win.exe
# => log-macos
# => log-linux
```

初次打包过程会下载对应平台的Node二进制包，会比较慢，所以需要等待一段时间。

地址：<GitHubLink repo="vercel/pkg" />

<style scoped>
h3 {
  display: flex;
}
img {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-left:10px;
  display: inline-block;
}
a {
  margin-left: 0.5em;
}
</style>