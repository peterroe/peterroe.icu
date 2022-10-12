## link and @import

link 引入 CSS 时候，是与页面同时加载的，@import 需要等网页完全载入以后加载

@import 是在 CSS2.1 引入的，可能会有兼容问题

我的理解：link更像是一个 CSS 入口，引入一个总体的 CSS 文件，在这个 CSS 文件里面再用 @import 做模块化拆分

## 清除浮动

```css
.box::after {
  content: '';
  display: block;
  clear: both;
}
```

官方对clear属性解释：“元素盒子的边不能和前面的浮动元素相邻”，所以它被挤到了最下面，就撑开了高度

## BFC

bfc 是页面中一个独立的环境，可以理解为容器，容器内的元素安装一定规则摆放，并且不影响容器外的元素

bfc 通过一定的规则创建

* body 是一个 bfc
* 浮动元素
* fixed、absolute定位
* display为 flex、inline-block 等
* overflow元素

**特点**

* 上下相邻的两个子元素 margin 会重叠
* 计算 bfc 高度，需要计算浮动元素高度（解决高度塌陷）
* 不会与 bfc 重叠 （两栏布局）

## 实现一个自适应正方形

利用 `padding/margin` 的百分比是参考 width 属性：

```css
.square {
  width: 20%
  padding-top: 20%
  height: 0
}
```

## 0.5px 的线

利用 transform 属性

```css
.min {
  transform: scale(0.5,0.5);
}
```