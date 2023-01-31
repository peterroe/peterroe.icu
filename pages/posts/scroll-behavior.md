---
title: 盘点浏览器的滚动行为
---

[[toc]]

> CSS 的滚动在有些情况下表现不符合我们的预期，又不知道如何去修正，这里是一些整理

### 控制滚动条展示 - overflow

这是我们最熟悉的滚动相关的属性，一般情况下，我们指定一个盒子的高度，通常还会给一个 `overflow: auto` 的属性，让溢出的内容能够通过用户的滚动行为展示出来

而 `overflow-x` 和 `overflow-y` 可以让我们更加细粒度的控制滚动，限制水平和垂直方向上的行为

https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow

---

### 控制突然插入内容的体验 - overflow-anchor

假设用户在滚动到容器的某一个位置时，容器里面插入了内容，默认情况下，浏览器会将当前视口锁定，但是我们可能不需要这种行为

https://www.zhangxinxu.com/wordpress/2020/08/css-overflow-anchor/

---

### 控制过长单词行为 - overflow-wrap

可能存在单词过长导致内容溢出的问题，可以用这个属性

https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap

---

### 子元素滚动外面不滚动 - overscroll-behavior

控制子元素滚动外面不滚动，一般情况下我们都需要这个特性，类似地， `overscroll-behavior-x` 和 `overscroll-behavior-y` 可以细粒度控制

https://www.zhangxinxu.com/wordpress/2020/01/css-overscroll-behavior/

---

### 页面平滑滚动到对应位置 - scroll-behavior/scrollIntoView

有两种方式实现

**HTML + CSS**

1）通过 `<input id="test">` `<lable for="test">` 和 `scroll-behavior: smooth`，点击 `label` 元素后，页面会顺滑地滚动到 `input` 元素处，因为必须使用 `input` 标签， 所以经常通常需要对它进行隐藏处理。

```html
<style>
html, body {
  scroll-behavior: smooth
}
</style>


<label for="test">click</input>
<!-- other DOM -->
<input id="test">target</input>
```

https://www.zhangxinxu.com/study/201810/css-scroll-behavior.php

2）通过 `<a href="#test">` `<xx id="test>` 和 `scroll-behavior: smooth`，点击 `a` 元素后，页面会顺滑地滚动到有对应 `id` 的元素处，这种方法会改变 URL 的 hash 值

```html
<style>
html, body {
  scroll-behavior: smooth
}
</style>


<a href="#test">click</a>
<!-- other DOM -->
<!-- 不一定是<h2>标签，但是大多数情况下，一般都是，而且搭配 h 系列标签更好 -->
<h2 id="test">target</h2>
```

> 小提示：`<a href="#">` 点击后，会滚动到页面顶部

**scrollIntoView**

上面 `HTML + CSS` 的方式都是需要点击一个元素，页面滚动到另一个元素处。而 `scrollIntoView` 可以在 JS 的执行期间调用，不强绑定用户的行为

```js
// 1. 捕获一个 DOM
const target = document.querySelector(/* id */)
// 2. 调用方法，让它出现在视口
target.scrollIntoView({
  behavior: 'smooth', // 3. 指定是否平滑滚动
});
```

https://www.zhangxinxu.com/wordpress/2018/10/scroll-behavior-scrollintoview-%e5%b9%b3%e6%bb%91%e6%bb%9a%e5%8a%a8/#

---

### 页面刷新后不定位到之前的滚动位置 - scrollRestoration

无论是哪个浏览器，都有这样一个体验细节。

那就是，如果浏览器不是强制刷新（Ctrl + F5），而是普通刷新（点击刷新按钮，或者按下 F5 刷新），则页面重新载入完毕后大概率会调到之前访问的位置，这段 JS 可以改变这个行为

```js
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
```

https://www.zhangxinxu.com/wordpress/2022/05/history-scrollrestoration/