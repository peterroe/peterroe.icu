---
title: Packages
subtitle: npm packages
---

[[toc]]

Gather some npm packages

### lz-string -- 字符串压缩 <GitHubStar repo="pieroxy/lz-string" />

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

### zustand -- React状态管理库 <GitHubStar repo="pmndrs/zustand" />

相比于`Redux`: 

* 简单
* 使钩子成为消费状态的主要手段
* 不会将您的应用程序包装在上下文提供程序中
* [可以暂时通知组件（不导致渲染）](https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes)

地址：<GitHubLink repo="pmndrs/zustand" />

---

### fake-indexeddb -- 用JS轻松操作 IndexedDB <GitHubStar repo="dumbmatter/fakeIndexedDB" />

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

### stitches -- CSS-in-js 方案（React）<GitHubStar repo="modulz/stitches" />

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

### Radix-ui -- 交互体验极佳的react的UI框架 <GitHubStar repo="radix-ui/primitives" />

支持键盘导航、焦点管理、屏幕阅读器测试。支持**鼠标右键下拉菜单**，原生推荐单组件使用：

```shell
$ npm install @radix-ui/react-context-menu
$ npm install @radix-ui/react-hover-card
```

地址：<GitHubLink repo="radix-ui/primitives" />

---

### fuite -- 检测内存泄露工具 <GitHubStar repo="nolanlawson/fuite" />

原理：通过使用`Puppeteer`启动`Chrome`，模拟点击页面上的各个链接，再返回，检测内存大小的变化

```shell
$ npm install -g fuite
$ fuite https://www.baidu.com
```

地址：<GitHubLink repo="nolanlawson/fuite" />

---

### caxa -- 将js脚本打包成exe程序 <GitHubStar repo="leafac/caxa" />

示例：在`src`文件夹下，新建`index.js`，编写内容后执行：

```shell
npm install -g caxa
$ caxa --input "./src" --output "hello.exe" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/index.js"
```

即生成`exe`程序

地址：<GitHubLink repo="leafac/caxa" />

---

### pkg -- 将js脚本跨平台打包（windows、mac、linux）<GitHubStar repo="vercel/pkg" />

执行：

```shell
$ npm install -g pkg
$ pkg ./log.js
```

地址：<GitHubLink repo="vercel/pkg" />

<style scoped>
h3 {
  display: flex;
}
img {
  margin-top: 0;
  margin-bottom: 0;
  margin-left:10px;
  display: inline-block;
}
a {
  margin-left: 0.5em;
}
</style>