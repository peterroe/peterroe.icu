---
title: Packages
subtitle: Gather some npm packages
---

[[toc]]

### picocolors ---> 体积极小的输出库 <GitHubStar repo="alexeyraspopov/picocolors" />

```js
import pc from "picocolors"

console.log(
  pc.green(`How are ${pc.italic(`you`)} doing?`)
)
```

地址：<GitHubLink repo="alexeyraspopov/picocolors" />

---

### type-fest ---> ts 类型库 <GitHubStar repo="sindresorhus/type-fest" />

```js
import type {Except} from 'type-fest';

type Foo = {
	unicorn: string;
	rainbow: boolean;
};

type FooWithoutRainbow = Except<Foo, 'rainbow'>;
//=> {unicorn: string}
```

地址：<GitHubLink repo="sindresorhus/type-fest" />

---

### obfuscator ---> javascript 混淆器 <GitHubStar repo="javascript-obfuscator/javascript-obfuscator" />

```js
var JavaScriptObfuscator = require('javascript-obfuscator');

var obfuscationResult = JavaScriptObfuscator.obfuscate(`
  (function(){
      var variable1 = '5' - 3;
      var variable2 = '5' + 3;
      console.log(variable3);
      console.log(variable4);
      console.log(variable5);
  })();
`);

console.log(obfuscationResult.getObfuscatedCode());
```

地址：<GitHubLink repo="javascript-obfuscator/javascript-obfuscator" />

---

### barba ---> 页面过度动画 <GitHubStar repo="barbajs/barba" />

```js
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});
```

地址：<GitHubLink repo="barbajs/barba" />

---

### snabbdom ---> 虚拟Dom <GitHubStar repo="snabbdom/snabbdom" />

虚拟 DOM patch，支持 svg

```js
const container = document.getElementById("container");

const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

const newVnode = h(
  "div#container.two.classes",
  { on: { click: anotherEventHandler } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!"),
  ]
);
// Second `patch` invocation
patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
```

地址：<GitHubLink repo="snabbdom/snabbdom" />

---

### gzip-size ---> 计算gzip压缩后的大小 <GitHubStar repo="terser/terser" />

经常被同时提及的还有另一个算法 -- brotli，brotle 对 Web 资源有着非常高的压缩率

```js
import {gzipSizeSync} from 'sindresorhus/gzip-size';

const text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

console.log(text.length);
//=> 191

console.log(gzipSizeSync(text));
//=> 78
```

地址：<GitHubLink repo="sindresorhus/gzip-size" />

地址：<GitHubLink repo="erwinmombay/brotli-size" />

---

### terser ---> js 压缩器 <GitHubStar repo="terser/terser" />

```js
import { minify } from 'terser'

minify(code)
```

地址：<GitHubLink repo="terser/terser" />

---

### stencli ---> Web 组件框架 <GitHubStar repo="ionic-team/stencil" />

Stencil 组件可以从一个与框架无关的代码库本地分发给 React、Angular、Vue 和传统 Web 开发人员

```js
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',            // the name of the component's custom HTML tag
  styleUrl: 'my-component.css',   // css styles to apply to the component
  shadow: true,                   // this component uses the ShadowDOM
})
export class MyComponent {
  // The component accepts two arguments:
  @Prop() first: string;
  @Prop() last: string;

   //The following HTML is rendered when our component is used
  render() {
    return (
      <div>
        Hello, my name is {this.first} {this.last}
      </div>
    );
  }
}

```

地址：<GitHubLink repo="ionic-team/stencil" />

---

### interact.js ---> 拖放、多点触控、惯性、捕捉功能 <GitHubStar repo="taye/interact.js" />

```js
var angle = 0

interact('#rotate-area').gesturable({
  listeners: {
    move (event) {
      var arrow = document.getElementById('arrow')

      angle += event.da

      arrow.style.transform = 'rotate(' + angle + 'deg)'

      document.getElementById('angle-info').textContent =
        angle.toFixed(2) + '\u00b0'
    }
  }
})
```

地址：<GitHubLink repo="taye/interact.js" />

---

### Tone.js ---> 用于在浏览器中制作交互式音乐的 Web 音频框架  <GitHubStar repo="Tonejs/Tone.js" />

```js
const synth = new Tone.Synth().toDestination();
const now = Tone.now()
synth.triggerAttackRelease("C4", "8n", now)
synth.triggerAttackRelease("E4", "8n", now + 0.5)
synth.triggerAttackRelease("G4", "8n", now + 1)
```

地址：<GitHubLink repo="Tonejs/Tone.js" />

---

### rrweb ---> 记录和回放 <GitHubStar repo="rrweb-io/rrweb" />

记录用户的操作，同时生成 canvas 回放，相较于录屏，有着更高的精度和灵活性

```js
let events = [];

rrweb.record({
  emit(event) {
    // push event into the events array
    events.push(event);
  },
});

// this function will send events to the backend and reset the events array
function save() {
  const body = JSON.stringify({ events });
  events = [];
  fetch('http://YOUR_BACKEND_API', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

// save events every 10 seconds
setInterval(save, 10 * 1000);
```

地址：<GitHubLink repo="rrweb-io/rrweb" />

---

### chartist ---> 简单的响应式图表 <GitHubStar repo="chartist-js/chartist" />

```js
import { BarChart } from 'chartist';

new BarChart('#chart', {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
  series: [
    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
  ]
}, {
  high: 10,
  low: -10,
  axisX: {
    labelInterpolationFnc: (value, index) => (index % 2 === 0 ? value : null)
  }
});
```

地址：<GitHubLink repo="chartist-js/chartist" />

---

### lit ---> Web Component 框架 <GitHubStar repo="lit/lit" />

对于想尝试 web 组件的人，值得一试

```js
import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import './my-header.js';
import './my-article.js';
import './my-footer.js';

@customElement('my-page')
class MyPage extends LitElement {
  render() {
    return html`
      <my-header></my-header>
      <my-article></my-article>
      <my-footer></my-footer>
    `;
  }
}
```

HTML: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="./my-page.js" type="module"></script>
  <title>lit-element code sample</title>
</head>
  <body>
    <my-page></my-page>
  </body>
</html>

```

地址：<GitHubLink repo="lit/lit" />

---

### deskreen ---> 局域网分享屏幕内容 <GitHubStar repo="pavlobu/deskreen" />

一款 APP，支持 win、mac、linux

地址：<GitHubLink repo="pavlobu/deskreen" />

---

### fullcalendar ---> 一个全尺寸的事件日历 <GitHubStar repo="fullcalendar/fullcalendar" />

```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <link href='fullcalendar/main.css' rel='stylesheet' />
    <script src='fullcalendar/main.js'></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth'
        });
        calendar.render();
      });
    </script>
  </head>
  <body>
    <div id='calendar'></div>
  </body>
</html>
```

地址：<GitHubLink repo="fullcalendar/fullcalendar" />

---

### icoicons ---> Icon for Web component  <GitHubStar repo="ionic-team/ionicons" />

* 易于使用
* SVG
* 自带懒加载

```html
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

<ion-icon name="heart"></ion-icon>
```

地址：<GitHubLink repo="ionic-team/ionicons" />

---

### tiptap ---> HeadLess 编辑器  <GitHubStar repo="ueberdosis/tiptap" />

支持多个框架

```js
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

new Editor({
  element: document.querySelector('.element'),
  extensions: [
    StarterKit,
  ],
  content: '<p>Hello World!</p>',
})
```

地址：<GitHubLink repo="ueberdosis/tiptap" />

---

### fingerprint ---> 精确的设备识别  <GitHubStar repo="fingerprintjs/fingerprintjs" />

在浏览器上运行，获取较为准确的信息

```js
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpcdn.io/v3/Se2pjBuE0r9EkhEsfaY7')
    .then(FingerprintJS => FingerprintJS.load())

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // This is the visitor identifier:
      const visitorId = result.visitorId
      console.log(visitorId)
    })
</script>
```

地址：<GitHubLink repo="fingerprintjs/fingerprintjs" />

---

### yup ---> 将类型检验带到运行时 <GitHubStar repo="jquense/yup" />

```js
import { object, string, number, date, InferType } from 'yup';

let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

// parse and assert validity
const user = await userSchema.validate(await fetchUser());

type User = InferType<typeof userSchema>;
/* {
  name: string;
  age: number;
  email?: string | undefined
  website?: string | null | undefined
  createdOn: Date
}*/
```

地址：<GitHubLink repo="jquense/yup" />

---

### ink ---> 用 React 写命令行工具 <GitHubStar repo="vadimdemedes/ink" />

挺有意思

```js
import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
```

<img v-viewer src="https://github.com/vadimdemedes/ink/raw/master/media/demo.svg" />

地址：<GitHubLink repo="vadimdemedes/in" />

---

### table ---> HeadLess 表格 <GitHubStar repo="TanStack/table" />

支持 `React、Svelte、Vue、Solid`

```js
import { useVueTable } from '@tanstack/vue-table'

function App() {
  const table = useVueTable(options)

  // ...render your table
}
```

地址：<GitHubLink repo="TanStack/table" />

---

### Astro ---> 静态网站构建 <GitHubStar repo="withastro/astro" />

选择的理由：

* 尽可能服务端渲染
* 网站速度快，内容关注与服务器优先的 MPA 架构
* 支持使用 `React、Preact、Svelte、Vue、Solid、Lit` 组件
* 丰富的可选择集成

```md
---
import { storyblokApi } from "../cms";

const { data } = await storyblokApi.get('cdn/links');
const links = Object.values(data.links);
---
<h1>Using your CMS</h1>
<p>
  With top-level await, Astro makes it easy
  to fetch content from your CMS.
</p>
<ul>
  {links.map((link) => (
    <li><a href={link.slug}>{link.name}</a></li>
  ))}
</ul>
```

地址：<GitHubLink repo="withastro/astro" />

---

### EditorJs ---> Block-style 编辑器 <GitHubStar repo="codex-team/editor.js" />

```js
import EditorJS from '@editorjs/editorjs';


const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs'
});
```

地址：<GitHubLink repo="codex-team/editor.js" />

---

### react-admin ---> React Admin 框架 <GitHubStar repo="t4t5/sweetalert" />

```js
// in app.js
import * as React from "react";
import { render } from 'react-dom';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import { PostList, PostEdit, PostCreate, PostIcon } from './posts';

render(
    <Admin dataProvider={restProvider('http://localhost:3000')}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    </Admin>,
    document.getElementById('root')
);
```

地址：<GitHubLink repo="doczjs/docz" />

---

### sweetalert ---> alert组件 <GitHubStar repo="t4t5/sweetalert" />

不依赖框架，使用方式很简单，直接调用即可

```js
swal("Good job!", "You clicked the button!", "success");
```

地址：<GitHubLink repo="t4t5/sweetalert" />

---

### docz ---> MDX注入React组件 <GitHubStar repo="doczjs/docz" />

如果 React还使用了CSS 预处理器等，也有相应的配套插件

```md
---
name: Button
route: /
---

import { Playground, Props } from 'docz'
import Button from './Button'

# Button

<Props of={Button} />

## Basic usage

<Playground>
  <Button type="submit">Click me</Button>
  <Button>No, click me</Button>
</Playground>
```

地址：<GitHubLink repo="doczjs/docz" />

---

### floating-ui ---> 创建一个浮动UI <GitHubStar repo="floating-ui/floating-ui" />

A low-level toolkit to create floating elements. Tooltips, popovers, dropdowns, and more

```js
import {computePosition} from '@floating-ui/dom';
 
const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');
 
computePosition(button, tooltip, {
  placement: 'right',
}).then(({x, y}) => {
  Object.assign(tooltip.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
});
```

地址：<GitHubLink repo="floating-ui/floating-ui" />

---

### react-spring ---> React 动画库<GitHubStar repo="pmndrs/react-spring" />

一个基于弹簧物理的 React 动画库

```js
const styles = useSpring({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

<animated.div style={styles} />
```

地址：<GitHubLink repo="pmndrs/react-spring" />

---

### slate ---> 编辑器框架 <GitHubStar repo="ianstormtaylor/slate" />

A completely customizable framework for building rich text editors. (Currently in beta.)

地址：<GitHubLink repo="ianstormtaylor/slate" />

---

### chakra UI ---> React组件库  <GitHubStar repo="chakra-ui/chakra-ui" />

accessible components library for React

```shell
$ npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

地址：<GitHubLink repo="chakra-ui/chakra-ui" />

---

### nativefier ---> Make App  <GitHubStar repo="nativefier/nativefier" />

通过 electron 将任何网站打包成桌面应用

```shell
$ npm install -g nativefier
$ nativefier https://twitter.com
```

地址：<GitHubLink repo="nativefier/nativefier" />

---

### immutable.js ---> 高效数据结构 <GitHubStar repo="immutable-js/immutable-js" />

用于 Javascript 的不可变持久数据集合，可提高效率和简单性

包括 `List、Stack、Map、OrderedMap、Set、OrderedSet` 等

```js
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
map1.get('b') + ' vs. ' + map2.get('b'); // 2 vs. 50
```

地址：<GitHubLink repo="immutable-js/immutable-js" />

---

### pixijs ---> WebGL 2D <GitHubStar repo="pixijs/pixijs" />

```js
import { Application, Sprite, Assets } from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();
```

地址：<GitHubLink repo="pixijs/pixijs" />

---

### socket.io ---> 双向通信 <GitHubStar repo="socketio/socket.io" />

依赖于 Engine.IO，并不是 websocket。尽管 Socket.IO 确实尽可能使用 WebSocket 作为传输，但它会为每个数据包添加一些元数据：数据包类型、名称空间和需要消息确认时的 ack id。这就是为什么 WebSocket 客户端将无法成功连接到 Socket.IO 服务器，而 Socket.IO 客户端也将无法连接到 WebSocket 服务器

```js
io.on('connection', socket => {
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});
```

地址：<GitHubLink repo="socketio/socket.io" />

---

### crawlee ---> NodeJs 爬虫 <GitHubStar repo="apify/crawlee" />

支持 `cheerio、playwright、puppeteer`

```js
import { PlaywrightCrawler, Dataset } from 'crawlee';

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        // Save results as JSON to ./storage/datasets/default
        await Dataset.pushData({ title, url: request.loadedUrl });

        // Extract links from the current page
        // and add them to the crawling queue.
        await enqueueLinks();
    },
    // Uncomment this option to see the browser window.
    // headless: false,
});

// Add first URL to the queue and start the crawl.
await crawler.run(['https://crawlee.dev']);
```

地址：<GitHubLink repo="apify/crawlee" />

---

### Pollen ---> CSS 变量库 <GitHubStar repo="heybokeh/pollen" />

支持 `CSS、CSS in JS、Object Style、Inline Style` 等多种写法

```js
.button {
   font-family: var(--font-sans);
   font-size: var(--scale-00);
   font-weight: var(--weight-medium); 
   line-height: var(--line-none);
   padding: var(--size-3) var(--size-5);
   background: var(--color-blue);
   border-radius: var(--radius-xs);
   color: white;
}
```

地址：<GitHubLink repo="heybokeh/pollen" />

---

### broz ---> 简易webview浏览器 <GitHubStar repo="antfu/broz" />

原理是通过 `electron` 打开一个webview，然后载入对应的网页

```shell
$ npx broz antfu.me
```

地址：<GitHubLink repo="antfu/broz" />

---

### AdminJS ---> NodeJS管理面板 <GitHubStar repo="SoftwareBrothers/adminjs" />

`frameworke` 例如 `express、koa、nestjs`。

`database adapter` 例如 `mongoose、sequelize、typeorm`

```js
npm install adminjs @adminjs/<your framework> @adminjs/<your database adapter>
```

地址：<GitHubLink repo="SoftwareBrothers/adminjs" />

---

### find-up ---> 文件查找 <GitHubStar repo="sindresorhus/find-up" />

通过遍历父目录查找文件或目录

```shell
/
└── Users
    └── sindresorhus
        ├── unicorn.png
        └── foo
            └── bar
                ├── baz
                └── example.js
```

```ts
import path from 'node:path';
import {findUp, pathExists} from 'find-up';

console.log(await findUp('unicorn.png'));
//=> '/Users/sindresorhus/unicorn.png'
```

地址：<GitHubLink repo="sindresorhus/find-up" />

---

### konva ---> Canvas库 <GitHubStar repo="konvajs/konva" />

```js
import Konva from 'konva';

const stage = new Konva.Stage({
  width: 500,
  height: 500,
});
```

地址：<GitHubLink repo="konvajs/konva" />

---

### tinybase ---> 一个结构化数据和表格状态的响应式库 <GitHubStar repo="tinyplex/tinybase" />


```js
const store = createStore()
  .setTable('pets', {fido: {species: 'dog'}})
  .setCell('pets', 'fido', 'color', 'brown');

console.log(store.getRow('pets', 'fido'));
// -> {species: 'dog', color: 'brown'}


const App1 = () => {
  const color = useCell('pets', 'fido', 'color', store);
  return <>Color: {color}</>;
};

const app = document.createElement('div');
ReactDOM.render(<App1 />, app);
console.log(app.innerHTML);
// -> 'Color: brown'

store.setCell('pets', 'fido', 'color', 'walnut');
console.log(app.innerHTML);
// -> 'Color: walnut'
```

地址：<GitHubLink repo="tinyplex/tinybase" />

---

### typescript-json ---> JSON快速序列化和类型检查 <GitHubStar repo="samchon/typescript-json" />

```js
import TSON from "typescript-json";

// RUNTIME TYPE CHECKERS
TSON.assertType<T>(input); // throws exception
TSON.is<T>(input); // returns boolean value
TSON.validate<T>(input); // archives all type errors

// STRINGIFY
TSON.stringify<T>(input); // 5x faster JSON.stringify()

// APPENDIX FUNCTIONS
TSON.application<[T, U, V], "swagger">(); // JSON schema application generator
TSON.create<T>(input); // 2x faster object creator (only one-time construction)
```

地址：<GitHubLink repo="samchon/typescript-json" />

---

### openapi-typescript ---> 将Swagger OpenAPI规范转为ts类型 <GitHubStar repo="googleapis/release-please" />


```shell
$ npx openapi-typescript https://petstore.swagger.io/v2/swagger.json --output petstore.ts
```

地址：<GitHubLink repo="googleapis/release-please" />

---

### atropos ---> 令人惊叹的悬停视差效果 <GitHubStar repo="nolimits4web/atropos" />

支持原生JS、Vue、React等

```html
<!-- main Atropos container (required), add your custom class here -->
<div class="atropos my-atropos">
  <!-- scale container (required) -->
  <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner">
        <!-- put your custom content here -->
      </div>
    </div>
  </div>
</div>

<script>
// import Atropos library
import Atropos from 'atropos';

// Initialize
const myAtropos = Atropos({
  el: '.my-atropos',
  // rest of parameters
});
</script>
```

地址：<GitHubLink repo="nolimits4web/atropos" />

<Atropos />

---

### craco ---> 为`create-react-app`项目添加配置文件 <GitHubStar repo="dilanx/craco" />

基于已有的`create-react-app`项目使用，让配置更加灵活，更加方便。

```shell
$ npm i @craco/craco
```

```diff
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

地址：<GitHubLink repo="dilanx/craco" />

---

### cosmiconfig ---> 加载配置文件 <GitHubStar repo="siddharthkp/bundlesize" />

例如当`moduleName`是`myapp`时，会依次加载查找：

* 带有`myapp`属性的`package.json`
* `JSON`和`YAML`格式的`.myapprc`
* `.myapprc.json`,`.myapprc.yaml`,`.myapprc.yml`,`.myapprc.js`,`.myapprc.cjs`
* `myapp.config.js`,`myapp.config.cjs`

```js
const { cosmiconfig, cosmiconfigSync } = require('cosmiconfig');
// ...
const explorer = cosmiconfig(moduleName);

// Search for a configuration by walking up directories.
// See documentation for search, below.
explorer.search()
  .then((result) => {
    // result.config is the parsed configuration object.
    // result.filepath is the path to the config file that was found.
    // result.isEmpty is true if there was nothing to parse in the config file.
  })
  .catch((error) => {
    // Do something constructive.
  });

```

地址：<GitHubLink repo="open-cli-tools/concurrently" />

---

### concurrently ---> 同时执行多个scripts命令 <GitHubStar repo="open-cli-tools/concurrently" />

支持命令行使用：

```shell
$ npm i concurrently -g
$ concurrently "command1 arg" "command2 arg"
```
或者在脚本中使用：
```json
{
  "scripts": {
    "start": "concurrently \"npm run dev\" \"npm run build\"",
  }
}
```

地址：<GitHubLink repo="open-cli-tools/concurrently" />

---

### bundlesize ---> 检验打包产物大小 <GitHubStar repo="siddharthkp/bundlesize" />

保证产物的大小不超过预期值

```shell
$ npm i bundlesize
```
```json
{
  "scripts": {
    "test": "bundlesize"
  },
  "bundlesize": [
    {
      "path": "./build/vendor.js",
      "maxSize": "3 kB"
    }
  ]
}
```

地址：<GitHubLink repo="siddharthkp/bundlesize" />

---

### chokidar ---> 监听文件修改  <GitHubStar repo="paulmillr/chokidar" />

基于`NodeJs`的`fs.watch`，但是有着更多的优点

```js
const chokidar = require('chokidar');

// One-liner for current directory
chokidar.watch('.').on('all', (event, path) => {
  console.log(event, path);
});
```

地址：<GitHubLink repo="paulmillr/chokidar" />

---

### depark ---> 通过PangRank算法计算最重要文件  <GitHubStar repo="codemix/deprank" />

```shell
$ npx deprank ./fixtures
```

```shell
| Filename               | Lines | Dependents | PageRank |
----------------------------------------------------------
| fixtures/core.js       | 3     | 1          | 0.284098 |
| fixtures/utils.js      | 4     | 3          | 0.268437 |
| fixtures/user/user.js  | 4     | 1          | 0.132253 |
| fixtures/todo.js       | 6     | 1          | 0.089796 |
| fixtures/user/index.js | 1     | 1          | 0.089796 |
| fixtures/concepts.js   | 4     | 1          | 0.079694 |
| fixtures/index.js      | 4     | 0          | 0.055926 |
```

地址：<GitHubLink repo="codemix/deprank" />

---

### canvas-confetti ---> Canvas礼花特效  <GitHubStar repo="catdad/canvas-confetti" />

想为你的网站添加礼花特效？试试它～

```ts
var myCanvas = document.createElement('canvas');
document.body.appendChild(myCanvas);

var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});
myConfetti({
  particleCount: 100,
  spread: 160
  // any other options from the global
  // confetti function
});
```

地址：<GitHubLink repo="catdad/canvas-confetti" />

---

### happy-dom ---> 更加轻量和快速的DOM环境 <GitHubStar repo="capricorn86/happy-dom" />

相比于`JSDOM`，更加轻量和快速，常用于测试框架、`SSR`框架中

```ts
import { Window } from 'happy-dom';

const window = new Window();
const document = window.document;

document.body.innerHTML = '<div class="container"></div>';

const container = document.querySelector('.container');
const button = document.createElement('button');

container.appendChild(button);

// Outputs "<div class="container"><button></button></div>"
console.log(document.body.innerHTML);
```

地址：<GitHubLink repo="capricorn86/happy-dom" />

---

### jsdom ---> 在NodeJs提供DOM环境 <GitHubStar repo="jsdom/jsdom" />

属于比较早期的库，很可惜不支持`esm`

```js
const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
```

地址：<GitHubLink repo="jsdom/jsdom" />

---

### tilg ---> 一个调试React组件的钩子 <GitHubStar repo="shuding/tilg" />

会在控制太打印出相关的信息，包括`props、children、lifecycle`等。

```ts
import useTilg from 'tilg'

function MyButton() {
  useTilg()
  return <button>Click me</button>
}
```

<img src="https://github.com/shuding/tilg/raw/main/screenshots/life-cycle-events.png" />

地址：<GitHubLink repo="shuding/tilg" />

---

### qnm ---> 查看依赖的详情信息 <GitHubStar repo="ranyitz/qnm" />

```shell
$ npm i -g qnm
$ qnm lodash
lodash 4.17.21 ↰ 2 days ago
├── 4.17.21 ✓
├─┬ cli-table2
│ └── 3.10.1 ⇡ 1 year ago
└─┬ karma
  └── 3.10.1 ⇡ 1 year ago
```

地址：<GitHubLink repo="ranyitz/qnm" />

---

### shx ---> node的便携式shell命令 <GitHubStar repo="shelljs/shx" />

无关平台，执行shell命令，只需要加上前缀，例如：

```shell
$ npm install -g shx
$ shx rm -rf node_modules
$ shx cp a.txt b.txt
```

适合在没有`shell`的环境，如`windows`上使用

地址：<GitHubLink repo="shelljs/shx" />

---

### playwright ---> e2e测试框架 <GitHubStar repo="microsoft/playwright" />

一些特性：

* 支持chromium、firefox、webkit
* 页面截图
* 模拟手机型号与地理位置
* 获取浏览器上下文信息
* 拦截网络请求

```ts
import { test, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 13 Pro'],
  locale: 'en-US',
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ['geolocation'],
})

test('Mobile and geolocation', async ({ page }) => {
  await page.goto('https://maps.google.com');
  await page.locator('text="Your location"').click();
  await page.waitForRequest(/.*preview\/pwa/);
  await page.screenshot({ path: 'colosseum-iphone.png' });
});
```

地址：<GitHubLink repo="microsoft/playwright" />

---

### nijia-keys ---> 为网站添加快捷键 <GitHubStar repo="ssleptsov/ninja-keys" />

为网站添加快捷键

```html
<template>
  <ninja-keys
    @selected="selected"
    @change="change"
    :data="hotkeys"
  ></ninja-keys>
</template>

<script setup>
import "ninja-keys";
// data etc..
</script>
```

地址：<GitHubLink repo="ssleptsov/ninja-keys" />

---

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

### defu ---> 深度合并对象 <GitHubStar repo="unjs/defu" />

和`deepmerge`不同的是会保留原对象的属性，而不是覆盖它们。

```ts
import { defu } from 'defu'

console.log(defu({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }))
// => { a: { b: 2, c: 3 } }
```

地址：<GitHubLink repo="unjs/defu" />

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

相似仓库：<GitHubLink repo="avoidwork/filesize.js" />

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

相似项目：<GitHubLink repo="mrmlnc/fast-glob" />、<GitHubLink repo="sindresorhus/globby" /> 、<GitHubLink repo="isaacs/node-glob" />

文件无关：<GitHubLink repo="isaacs/minimatch" />、<GitHubLink repo="isaacs/pico" />

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