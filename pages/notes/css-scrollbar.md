---
title: scrollbar-gutter改变滚动条挤压
date: 2022-01-13
---

如下的`Css`属性可以改变滚动条的挤压行为：
```css
.gutter {
  scrollbar-gutter: stable
}
```

使用后，会为滚动条预先留出空间，防止滚动条的出现而影响布局：

<scrollGutter />

***