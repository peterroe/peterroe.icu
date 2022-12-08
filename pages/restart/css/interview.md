---
title: CSS高频面试题
---

### CSS 隔离方案

* CSS 模块，vue 的 scoped，react 的 CSS Module
* BEM 命名规范
  * Block 类名 btn
  * Element 元素 btn_button
  * Modifier 修饰器 btn_button__larger
* 使用命名空间

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

通过设置 transform 加上 transition 的过渡实现，监听滚动事件，改变 transform 的值

### 视差滚动的实现

视差的效果是通过前景的滚动速度和背景的滚动速度不一致达到的

实现方式：

* CSS 的 attachment
* JS 库，如 stellar.js

### CSS 会阻塞 DOM 的解析吗？

不会阻塞 DOM 解析，但是会阻塞渲染，严格来说是阻塞 render tree 的生成

HTML 和 CSS 解析是并行的

### rgba 和 opacity

rgba 只会用于元素的颜色或背景色，而 opactiy 是使整个元素透明

### 文字重叠？

设置 line-height 和 letter-spacing 可以使文字重叠（没啥用，可能有用）

### 响应式设计和自适应设计

响应式设计的工作原理是灵活性——一个可以在任何设备上看起来都不错的单一流体网站。响应式网站使用媒体查询、灵活的网格和响应式图像来创建基于多种因素灵活变化的用户体验。就像一个球在增长或缩小以适应几个不同的箍。

自适应设计更像是渐进增强的现代定义。自适应设计不是一种灵活的设计，而是检测设备和其他特征，然后根据一组预定义的视口大小和其他特征提供适当的特征和布局。该站点检测使用的设备类型并提供该设备的预设布局。不是一个球穿过几个不同大小的箍，而是根据箍的大小使用几个不同的球，例如我们经常会看到，使用不同的设备访问电商网站，会重定向到不同的地址。

### 视觉上隐藏内容（并使其仅对屏幕阅读器可用）有哪些不同的方法？

**小尺寸**

使用 `width: 1px;height: 1px` 或者使用 CSS 裁剪 `clip: rect(0,0,0,0)`，不推荐使用 `width: 0; height; 0` 因为搜索引擎可能会认为它具有恶意意图，例如关键字填充

**绝对定位**

`position: absolute; left: -99999px` 将元素定位在屏幕之外

**文本缩进**

`text-indent: -9999px`，这仅适用于block元素内的文本。与上面的绝对定位技术类似，这种风格的可聚焦元素仍然是可聚焦的，这会给使用键盘导航的有视力的用户带来困惑

**不正确的方式**

`display:none`，`visibility: hidden`，这些方法是不正确的，因为它们对用户和屏幕阅读器都隐藏了内容