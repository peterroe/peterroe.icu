---
title: CSS高频面试题
---

### link and @import

link 引入 CSS 时候，是与页面同时加载的，@import 需要等网页完全载入以后加载

@import 是在 CSS2.1 引入的，可能会有兼容问题

我的理解：link更像是一个 CSS 入口，引入一个总体的 CSS 文件，在这个 CSS 文件里面再用 @import 做模块化拆分

### 清除浮动

```css
.box::after {
  content: '';
  display: block;
  clear: both;
}
```

官方对clear属性解释：“元素盒子的边不能和前面的浮动元素相邻”，所以它被挤到了最下面，就撑开了高度

### BFC

bfc 是页面中一个独立的环境，可以理解为容器，容器内的元素安装一定规则摆放，并且不影响容器外的元素

bfc 通过一定的规则创建

* body 是一个 bfc
* 浮动元素
* fixed、absolute定位
* display 为 flex、inline-block 等
* overflow 元素

**特点**

* 上下相邻的两个子元素 margin 会重叠
* 计算 bfc 高度，需要计算浮动元素高度（解决高度塌陷）
* 不会与 bfc 重叠 （两栏布局）

### 实现一个自适应正方形

利用 `padding/margin` 的百分比是参考 width 属性：

```css
.square {
  width: 20%
  padding-top: 20%
  height: 0
}
```

### 0.5px 的线

利用 transform 属性

```css
.min {
  transform: scale(0.5,0.5);
}
```

### 为什么 CSS 选择器是从右往左解析的？

若从左往右匹配，发现不符合规则，需要进行回溯，会损失很多性能。而从右往左匹配，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历

### 全屏滚动的实现

通过设置 transformY 加上 transition 的过渡实现，监听滚动事件，改变 transform 的值

### 视差滚动的实现

视差的效果是通过前景的滚动速度和背景的滚动速度不一致达到的

实现方式：

* CSS 的 attachment
* JS 库，如 stellar.js

