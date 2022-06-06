---
title: Packages
subtitle: Gather some npm packages
---

[[toc]]

### mem ---> 缓存结果 <GitHubStar repo="sindresorhus/mem" />

缓存相同的输入，以便更快的输出

```ts
import mem from 'mem';
import got from 'got';
import delay from 'delay';

const memGot = mem(got, {maxAge: 1000});

await memGot('https://sindresorhus.com');

// This call is cached
await memGot('https://sindresorhus.com');

await delay(2000);

// This call is not cached as the cache has expired
await memGot('https://sindresorhus.com');
```

地址：<GitHubLink repo="sindresorhus/mem" />

---

### nock ---> 基于NodeJs的http服务模拟 <GitHubStar repo="nock/nock" />

```js
import got from 'got';
import nock from 'nock';

const scope = nock('https://sindresorhus.com')
	.get('/')
	.reply(500, 'Internal server error')
	.persist();

try {
	await got('https://sindresorhus.com')
} catch (error) {
	console.log(error.response.body);
	//=> 'Internal server error'

	console.log(error.response.retryCount);
	//=> 2
}

scope.persist(false);
```

地址：<GitHubLink repo="nock/nock" />

---

### got ---> 友好的NodeJs的http请求库 <GitHubStar repo="sindresorhus/got" />

用法类似`axios`，但是又很多特性：

* http2支持
* 代理
* 重发
* Cache
* Unix域Socket
* 测试
* Stream
* ...

地址：<GitHubLink repo="sindresorhus/got" />

---

### dom-chef ---> 使用JSX构建DOM <GitHubStar repo="vadimdemedes/dom-chef" />

使用需要进行配置

```jsx
//xx.jsx
import {h} from 'dom-chef';

const handleClick = e => {
	// <button> was clicked
};

const el = (
	<div className="header">
		<button className="btn-link" onClick={handleClick}>
			Download
		</button>
	</div>
);

document.body.appendChild(el);
```
```js
//babel.config.js
const plugins = [
	[
		'@babel/plugin-transform-react-jsx',
		{
			pragma: 'h',
			pragmaFrag: 'DocumentFragment',
		},
	],
];
```
```json
//tsconfig.json
{
	"compilerOptions": {
		"jsxFactory": "h",
		"jsxFragmentFactory": "DocumentFragment"
	}
}
```

当然，也可以默认导出`React`的方式来配置

```ts
import React from 'dom-chef';
```

地址：<GitHubLink repo="vadimdemedes/dom-chef" />

---

### delegate-it ---> 轻量的事件代理库 <GitHubStar repo="fregante/delegate-it" />

假设有如下`DOM`元素：

```html
<div id="app">
  <p></p>
  <p></p>
  <p></p>
  <!-- ... -->
<div>
```

当我们需要在`p`上触发一个事件，显然由于`p`元素过多，性能不佳。因此可以将事件代理在`div`上：

```ts
delegate('#app', 'p', 'click', function(e) {
    console.log(e.delegateTarget);
}, false);
```

地址：<GitHubLink repo="fregante/delegate-it" />

---

### trash ---> 移动文件到回收站 <GitHubStar repo="sindresorhus/trash" />

不同于`rimraf/del`，`trash`只是将文件移动到回收站，而不是删除。

```ts
import trash from 'trash';

await trash(['*.png', '!rainbow.png']);
```

地址：<GitHubLink repo="sindresorhus/trash" />

---

### cac ---> 命令行参数解析工具 <GitHubStar repo="cacjs/cac" />

如果你想开发一款命令行工具，试试它

```ts
const cli = require('cac')()

cli
  .command('build <entry> [...otherFiles]', 'Build your app')
  .option('--foo', 'Foo option')
  .action((entry, otherFiles, options) => {
    console.log(entry)
    console.log(otherFiles)
    console.log(options)
  })

cli.help()

cli.parse()
```

<img src="https://user-images.githubusercontent.com/8784712/48979056-47125080-f0f0-11e8-9d8f-3219e0beb0ed.png" />

地址：<GitHubLink repo="cacjs/cac" />

---

### data-fns ---> 日期操作库 <GitHubStar repo="date-fns/date-fns" />

操作包括，给日期做加减法、找出最靠近某个日期的日期等等，还有最重要的支持`i18n`的格式化：

```js
const { formatDistance, subDays } = require('date-fns')
const { zhCN }  = require('date-fns/locale')

console.log(formatDistance(new Date('2022-05-26'), new Date(), { addSuffix: true, locale: zhCN }))
// 大约 16 小时前

console.log(formatDistance(new Date('2022-05-20'), new Date(), { addSuffix: true, locale: zhCN }))
// 7 天前
```

地址：<GitHubLink repo="date-fns/date-fns" />

---

### deepmerge ---> 深度合并对象 <GitHubStar repo="TehShrike/deepmerge" />

`Object.assign`只能合并一级对象，而`deepmerge`可以合并多级对象。

```ts
const x = {
	foo: { bar: 3 },
	array: [{ does: 'work', too: [ 1, 2, 3 ]}]
}

const y = {
	foo: { baz: 4 },
	quux: 5,
	array: [{ does: 'work', too: [ 4, 5, 6 ] }, { really: 'yes' }]
}

const output = {
	foo: { bar: 3, baz: 4},
	array: [{ does: 'work',too: [ 1, 2, 3 ] }, { does: 'work', too: [ 4, 5, 6 ] }, { really: 'yes' }],
	quux: 5
}

merge(x, y) // => output

Object.assign(x, y) // => 
/*
{
  foo: { baz: 4 },
  array: [{ does: 'work', too: [4, 5, 6]}, { really: 'yes' }],
  quux: 5
}
*/
```

地址：<GitHubLink repo="TehShrike/deepmerge" />

---
 
### joi ---> 精确地描述数据与预期的差异 <GitHubStar repo="sideway/joi" />

通过配置标准数据的预定格式，给出与测试数据不一致的描述

```ts
import Joi from 'joi'

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),

  access_token: [ Joi.string(), Joi.number()],

  birth_year: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

}).with('username', 'birth_year')
  .xor('password', 'access_token')
  .with('password', 'repeat_password');


console.log(schema.validate({ username: 'abc', birth_year: 1994 }))
/*
{
  value: { username: 'abc', birth_year: 1994 },
  error: [Error [ValidationError]: "value" must contain at least one of [password, access_token]] {
    _original: { username: 'abc', birth_year: 1994 },
    details: [ [Object] ]
  }
}
*/
```

地址：<GitHubLink repo="sideway/joi" />

---

### sharp ---> 高性能NodeJs图片加工 <GitHubStar repo="lovell/sharp" />

典型用例是将常见格式的大图像转换为更小的、对 Web 友好的、不同尺寸的 JPEG、PNG、WebP、GIF 和 AVIF 图像

```ts
const sharp = require('sharp')

sharp('test.svg')
  .rotate()
  .resize(200)
  .jpeg({ mozjpeg: true })
  .toFile('hh.jpeg')
```

地址：<GitHubLink repo="lovell/sharp" />

---

### trpc ---> 配合zod，提供端到端类型安全的API <GitHubStar repo="trpc/trpc" />

<img class="!mx-0 shadow" src="https://camo.githubusercontent.com/807db37b3325f74c704760be6dbf76f652b6fe50b1b83fd32eba7f2c5780f985/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f747270632f747270636769662e676966" />

地址：<GitHubLink repo="trpc/trpc" />

---

### sanitizi-html ---> 验证属于白名单的html元素  <GitHubStar repo="apostrophecms/sanitize-html" />

验证`html`元素或者属性的结构是否是预期的，或者转化为预期的结构

```ts
const dirty = 'some really tacky HTML';

const clean = sanitizeHtml(dirty, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com'],
  allowedStyles: {
    '*': {
      // Match HEX and RGB
      'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
      'text-align': [/^left$/, /^right$/, /^center$/],
      // Match any number with px, em, or %
      'font-size': [/^\d+(?:px|em|%)$/]
    },
    'p': {
      'font-size': [/^\d+rem$/]
    }
  },
  transformTags: {
    'ol': sanitizeHtml.simpleTransform('ul', {class: 'foo'}),
  }
});
```

地址：<GitHubLink repo="apostrophecms/sanitize-html" />

---

### debug ---> 埋点调试 <GitHubStar repo="debug-js/debug" />

通过设置环境变量，灵活选择调试的模块

```ts
var a = require('debug')('worker:a')
  , b = require('debug')('worker:b');

function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}

work();

function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}

workb();
```

```shell
$ DEBUG=worker:* node index.js
$ DEBUG=worker:b node index.js
```

地址：<GitHubLink repo="debug-js/debug" />

---

### typedoc ---> ts类型文档生成器 <GitHubStar repo="TypeStrong/typedoc" />

为你的导出的`ts`类型生成文档

```shell
$ npm install typedoc
$ typedoc src/index.ts
```

地址：<GitHubLink repo="TypeStrong/typedoc" />

---

### dotenv --->  添加环境变量到node进程中 <GitHubStar repo="motdotla/dotenv" />

```shell
# .env
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

```ts
import 'dotenv/config'
console.log(process.env)

/*
  {
    ...
    S3_BUCKET="YOURS3BUCKET"
    SECRET_KEY="YOURSECRETKEYGOESHERE"
  }
*/
```

地址：<GitHubLink repo="motdotla/dotenv" />

---

### minimist --->  解析命令行参数 <GitHubStar repo="substack/minimist" />

```ts
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
```

```shell
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```

地址：<GitHubLink repo="substack/minimist" />

---

### markdown-it ---> 经典markdown解析器 <GitHubStar repo="markdown-it/markdown-it" />

```ts
// 基本用法
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// 丰富的插件机制
var md = require('markdown-it')()
  .use(plugin1)
  .use(plugin2, opts, ...)
  .use(plugin3);
```

地址：<GitHubLink repo="markdown-it/markdown-it" />

---

### conventional-changelog-cli ---> 自动生成日志 <GitHubStar repo="conventional-changelog/conventional-changelog" />

根据`git`记录，生成`CHANGELOG.md`日志

```shell
$ npm i conventional-changelog-cli -g
$ conventional-changelog -p angular -i CHANGELOG.md -s
```

地址：<GitHubLink repo="conventional-changelog/conventional-changelog" />

---

### csstype ---> 为css-in-js提供类型支持 <GitHubStar repo="frenic/csstype" />

支持`ts`和`flowJs`写法，让`CSS`也拥有类型能力

```ts
import type * as CSS from 'csstype';

const style: CSS.Properties = {
  colour: 'white', // Type error on property
  textAlign: 'middle', // Type error on value
};

let button = document.createElement('button');

Object.assign(button.style, style);
```

地址：<GitHubLink repo="frenic/csstype" />

---

### unified ---> markdown语法解析接口 <GitHubStar repo="unifiedjs/unified" />

通过语法树解析、检查、转换和序列化内容的接口

```ts
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import {reporter} from 'vfile-reporter'

unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument, {title: '👋🌍'})
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process('# Hello world!')
  .then(
    (file) => {
      console.error(reporter(file))
      console.log(String(file))
    },
    (error) => {
      // Handle your error here!
      throw error
    }
  )

/*
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>👋🌍</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
 */
```

地址：<GitHubLink repo="unifiedjs/unified" />

---

### marked ---> 高效的Markdown解析器 <GitHubStar repo="markedjs/marked" />

```ts
import * as marked from 'marked'

console.log(marked.parse('## hello world'))

// <h2 id="hello-world">hello world</h2>
```

地址：<GitHubLink repo="markedjs/marked" />

---

### shiki ---> 语法高亮 <GitHubStar repo="shikijs/shiki" />

```ts
import shiki from 'shiki'

shiki
  .getHighlighter({
    theme: 'nord'
  })
  .then(highlighter => {
    console.log(highlighter.codeToHtml(`console.log('shiki');`, { lang: 'js' }))
  })

// <pre class="shiki" style="background-color: #2e3440"><code>
//   <!-- Highlighted Code -->
// </code></pre>
```

地址：<GitHubLink repo="shikijs/shiki" />

---

### del ---> glob匹配删除文件 <GitHubStar repo="sindresorhus/del" />

```ts
import del from 'del'

(async () => {
	const deletedFilePaths = await del(['temp/*.js', '!temp/unicorn.js']);
	const deletedDirectoryPaths = await del(['temp', 'public']);

	console.log('Deleted files:\n', deletedFilePaths.join('\n'));
	console.log('\n\n');
	console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'));
})();
```

地址：<GitHubLink repo="sindresorhus/del" />

---

### showdown ---> HTML/Markdown转换器 <GitHubStar repo="showdownjs/showdown" />

用`JavaScript`编写的双向`Markdown`到`HTML`到`Markdown`转换器

```ts
import showdown from 'showdown'

var converter = new showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(text);

//=>  <h1 id="hellomarkdown">hello, markdown!</h1>

```

地址：<GitHubLink repo="showdownjs/showdown" />

---

### escape-goat ---> 实体符号转换 <GitHubStar repo="sindresorhus/escape-goat" />

将部分符号转化为实体 

```txt
& to &amp;
< to &lt;
> to &gt;
" to &quot;
' to &#x27;
` to &#x60;
```

```ts
import { htmlEscape, htmlUnescape } from 'escape-goat'

console.log(htmlEscape('Hello <em>World</em>'))
//=> 'Hello &lt;em&gt;World&lt;/em&gt'

const url = 'https://sindresorhus.com?x="🦄"';
console.log(htmlEscape`<a href="${url}">Unicorn</a>`)
//=> '<a href="https://sindresorhus.com?x=&quot;🦄&quot;">Unicorn</a>'

```

地址：<GitHubLink repo="sindresorhus/escape-goat" />

---

### open ---> 打开一切 <GitHubStar repo="sindresorhus/open" />

```ts
import open from 'open'

await open('./dog.png') // 默认的图片查看器打开

await open('./index.ts') // 默认的编辑器打开

await open('https://peterroe.icu') // 默认浏览器打开网页

await open('https://peterroe.icu', { app: { name: 'firefox' }) // firefox打开

await open('xcode') // 打开一个软件
```

地址：<GitHubLink repo="sindresorhus/open" />

---

### ufo ---> 功能丰富的URL处理 <GitHubStar repo="unjs/ufo" />

用法多样，解决大多数`URL`处理问题。包括提取内容、替换内容、判断内容等。

```ts
import { parseURL, withQuery, ... } from 'ufo'

// Result: { protocol: 'http:', auth: '', host: 'foo.com', pathname: '/foo', search: '?test=123', hash: '#token' }
parseURL('http://foo.com/foo?test=123#token')

// Result: /foo?page=a&token=secret
withQuery('/foo?page=a', { token: 'secret' })

// Result: { test: '123', unicode: '好' }
getQuery('http://foo.com/foo?test=123&unicode=%E5%A5%BD')

// Result: true
isSamePath('/foo', '/foo/')

// Result: http://example.com
withHttp('https://example.com')
```

地址：<GitHubLink repo="unjs/ufo" />

---

### ohash ---> 轻便的内容哈希 <GitHubStar repo="unjs/ohash" />

```ts
import { hash, objectHash, murmurHash } from 'ohash'

console.log(objectHash({ foo: 'bar'}))  //将对象转为稳定安全的哈希字符串
// "object:1:string:3:foo:string:3:bar,"

console.log(murmurHash('Hello World')) // 将字符串转为32位正整数
// "2708020327"

console.log(hash({ foo: 'bar'})) // 先objectHash ，后murmurHash
// "2736179692"
```

地址：<GitHubLink repo="unjs/ohash" />

---

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

相似项目：<GitHubLink repo="mrmlnc/fast-glob" />、<GitHubLink repo="sindresorhus/globby" /> 、<GitHubLink repo="isaacs/node-glob" />、<GitHubLink repo="isaacs/minimatch" />

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

相似仓库：<GitHubLink repo="pmndrs/jotai" />

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