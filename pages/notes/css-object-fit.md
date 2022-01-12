---
title: object-fit
date: 2021-11-27
---

`object-fit` 是一个`css属性`，该属性用来裁剪图片

```css
img {
    object-fit: none | cover | contain | fill | scale-down
}
```

* 默认是 `none`
* `contain` 保证图片等比例完全显示
* `cover` 保证图片被填满，部分显示
* `fill` 拉伸图片，**非原比例**放大

<objectFit />