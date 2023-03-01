---
title: iframe 相关的 CSS 问题
date: 2023-02-28
---

### 修改 iframe 的 CSS

处于安全考虑，浏览器限制了不同域的 JS 操作，这就意味着，我们只能操作同一域下的 `iframe` 中的样式

那如何修改呢？我们通过 `contentDocument` 来获取 `iframe` 中的 `document`

```js
const iDocument = document.querySelector('iframe').contentDocument
```

这样就可以通过捕获其中的 DOM 元素，做对应的操作

### 伪元素的注入

伪元素是用于向某些选恶气设置特殊的效果，比如 :before :after，用于在CSS渲染中向元素的头部或尾部插入内容，它们不受文档约束，也不影响文档本身，只影响最终样式。

这些添加的内容不会出现在DOM中，仅仅是在CSS渲染层中加入。它不存在于文档中，所以JS无法直接操作它。

更改伪元素的样式

方式一：更换Class

```js
// CSS代码
.red::before { content: "red"; color: red; }
.green::before { content: "green"; color: green; }

// HTML代码
<div class="red">测试测试</div>

// jQuery代码
$(".red").removeClass('red').addClass('green');
```

方式二：干预 StyleSheet

```js
// 支持非IE的现代浏览器
document.styleSheets[0].insertRule('.red::before { content: "red";color: red; }', 0);
```

方式三：在 style 标签中插入

```js
//js代码
var style = document.createElement("style");
document.head.appendChild(style);
sheet = style.sheet;
 
sheet.insertRule('.red::before { content: "red";color: red; }', 0);
```