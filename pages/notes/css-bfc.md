---
title: 清除浮动与BFC
date: 2022-01-18
---

[[toc]]


**父级absolute/float**

这种方式治标不治本，会导致父盒子也脱离文档流，属于`BFC`

```css
.parent {
  position: absolute;
  /* or: */
  float: left;
}
```

**clear:both**

可以在最后一个子元素加上，或者直接给父盒子加上

```css
.child:last-child {
  clear: both;
}

.parent {
  clear: both
}
```

`clear: both`代表左右都不能有浮动元素，迫使它向下移动，进而撑开父盒子

<img border src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa44b80414c8463092abd1c0103e64b6~tplv-k3u1fbpfcp-watermark.awebp" />

**overflow: hidden**

常用方式，属于`BFC`

## 什么是BFC

`Block Formatting Context`块级格式化上下文

触发条件

* HTML标签
* float值为`left/right`
* position值为`absolute/fixed`
* overflow不为`visiable`，例如`hidden/auto/scroll`
* display值为`inline-block/table/table-cell/flex/inline-flex/grid/inline-grid`

如何理解

* 内部的盒子在垂直方向上会一个接一个的排列
* 垂直方向的margin会发生外边距合并（类似flex的justify-content: space-evenly垂直排列）
* 一个元素只能唯一属于一个BFC
* float元素不与BFC元素重叠
* 计算BFC高度时候，浮动元素参与计算（原理）