---
title: overscroll-behavior改变滚动行为
date: 2022-01-13
---

`overscroll-behavior`默认的属性：

```css
div {
    overscroll-behavior: auto;
}
```

会出现如下的情况，当下面的盒子滚动到底部的时候，再次滚动会触发父盒子的滚动：

<overscroll />

只需要改变默认的值为 `contain`即可

```css
div {
    overscroll-behavior: contain;
}
```