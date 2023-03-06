---
title: 盘点浏览器的滚动相关行为
date: 2023-01-31
duration: 10min
---

[[toc]]

> CSS 的滚动在有些情况下表现不符合我们的预期，又不知道如何去修正，这里是一些兼容性比较好的特性

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

### 预留滚动条的位置 - scrollbar-gutter

通过预留滚动条的位置，可以让滚动条突然出现的时候，文字排版不会变化

https://www.zhangxinxu.com/wordpress/2022/01/css-scrollbar-gutter/

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

---

### 吸附滚动 - scroll snap type

可以实现移动端 Swipe 的效果，处理大小不一致的子元素很好用

```html
<style>
  .scroll-x {
    width: 300px;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    overflow: auto;
  }
  .scroll-x img { 
    scroll-snap-align: start;
  }
</style>
<div class="scroll-x">
  <img src="./mm.jpg">
  <img src="./mm2.jpg">
  <img src="./mm3.jpg">
  <img src="./mm4.jpg">
  <img src="./mm5.jpg">
</div>
```

https://www.zhangxinxu.com/wordpress/2018/11/know-css-scroll-snap/

---

### 容器滚动 - scrollTop/scrollLeft/scrollTo()/scrollBy()

`scrollTop/scrollLeft` 可以让容器滚动到某一个位置，配合 CSS 的 `scroll-behavior` 还可以有平滑滚动的效果

```html
<ul>
  <li />
  <li />
  <li />
  <li />
</ul>

<script>
  document.querySelector('ul').scrollTop = 200
</script>
```

`scrollTo()` 表示滚到到指定的位置，而`scrollBy()`表示相对当前的位置滚动多少距离。而且可以单词指定是否平滑。不用像上面设置 CSS 的 `scroll-behavior: smooth`

::: info
`scrollTo()` 和 `scroll()` 等价，这里不做过多介绍
:::

```js
// 语法
element.scrollTo(x-coord, y-coord)
element.scrollTo(options)
element.scrollBy(x-coord, y-coord)
element.scrollBy(options)

// 例子
element.scrollBy(10, 20)
// 等价于
element.scrollBy({
  left: 10,
  right: 20,
  // behavior: 'smooth' //是否平滑
})
```

https://www.zhangxinxu.com/wordpress/2019/07/js-scrollto-scrollby/

### 解决 sticky 和锚点的冲突

当页面存在使用了 sticky 定位的 header 元素时候，我们发现使用 `scrollIntoView` 等方法，让页面滚动到元素所在的地方的时候，内容会被遮住

查看：https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/

这个时候，可以通过使用 `scroll-margin-top` 来解决问题

```css
h1 {
  scroll-margin-top: 5rem
}
```

或者如果不确定哪些元素会被锚点，控制滚动容器的 padding 也是可以的，好处就是省去了对每个元素添加 CSS 的麻烦

```css
body {
  scroll-padding-top: 5rem
}
```