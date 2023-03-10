---
title: CSS
---

[[toc]]

### CSS

CSS 与 HTML 协同工作，通过 CSS 可以对 HTML 标签进行样式的定义，使得页面更加美观

CSS由多组“规则”组成。每个规则由“选择器”（selector）、“属性”（property）和“值”（value）组成：

* 选择器（Selector）：多个选择器可以半角逗号（,）隔开。
* 属性（property）：CSS1、CSS2、CSS3规定了许多的属性，目的在控制选择器的样式。
* 值（value）：指属性接受的设置值，多个关键字时大都以空格隔开

### 历史

CSS 由 W3C 组织制定，CSS1 于 1996 年发布，CSS2 于 1998 年发布，CSS3 于 2011 年发布

### 缺点

* 没有父选择器
* 不能明确地指定继承性
* 垂直控制的局限

### 选择器

CSS里现在共有5种基本选择器、4种组合选择器、5种伪元素选择器和N种伪类选择器。不同选择器的优先级别和运作性能往往存在差异

#### 基本选择器

* ID选择器（100权值）
* 类选择器（10权值）
* 属性选择器（10权值）
* 标签选择器（1权值）
* 通配符选择器（0权值）

#### 组合选择器

| 符号 | 说明 |
| :---: | :---: |
|A > B |	子代选择器，选择A下一层的元素B |
|A ~ B | 兄弟选择器，选择与A同层的元素B |
|A + B |	相邻兄弟选择器，选择与A相邻的元素B（不能被任何元素相隔）|
|A &nbsp;&nbsp; B |后代选择器，包含选择符|

#### 伪元素选择器

本质上是创建了一个虚拟容器，可以添加样式，而且具备节点的效果，但是不会出现在 DOM 树中，一般建议伪元素选择器用两个冒号来表示

* ::first-line : 选择元素的第一行
* ::first-letter : 选择元素的第一个字母
* ::before : 在元素的前面插入内容
* ::after : 在元素的后面插入内容
* ::selection : 改变网页的默认选中文本的效果

#### 伪类选择器

和类选择器、属性选择器权值相同（10）。用于定义元素的状态，伪类选择器数量太多了，还可以再细分为几个类

**链接伪类选择器**

* :link : 未被访问的链接（仅a标签适用）
* :visited : 已被访问的链接（仅a标签适用）
* :hover : 鼠标悬停在链接上
* :active : 鼠标点击链接

链接伪类选择器可以用来控制链接的状态，但是只能改变链接的**颜色**

其中 link 和 visited 只能用于 a 标签，而 hover 和 active 可以用于其他符合条件的元素

**结构伪类选择器**

我认为最常用的有三个选择器

* :first-child : 选择元素的第一个子元素
* :last-child : 选择元素的最后一个子元素
* :nth-child(n) : 选择元素的第n个子元素

其中 `first-child` 和 `last-child` 可以用来控制首尾元素，需要/不需要某些样式，而`nth-child(n)`是一个比较通用的方案，其中 n 从 0 增长，结合不同的公式可以实现各种选择效果

值得一提的是，还有类似 first-of-type，last-of-type，nth-of-type 等 -of-type 结尾的选择器，效果和上面类似，但是更加严格，举个例子：

```css
/* -child 强调的是先满足元素类型，再满足位置要求  */
ul li:first-child { /* 即先找到 li，再找到第一个位置的 li */
  background: red;
}

/* -of-type 强调的是位置和类型需要同时满足 */
ul li:first-of-type {  /* 即找到 li，而且要求第一个元素就是 li */
  background: blue;
}
```

作用于如下的 HTML 结构：

```html
<ul>
  <a>1</a>  <!-- 不会被选中 -->
  <li>2</li> <!-- 会被选中，red -->
  <li>3</li> 
</ul>
```

还有一些值得了解的伪类选择器

* :empty : 选择元素的内容为空的元素
* :root : 选择文档的根元素（优先级比html标签选择器高）
* :target : 选择当前活动的目标元素（哈希定位）
* :not(selector) : 选择不符合选择器的元素

复杂多变的 input 标签也有着自己的伪类选择器，方便我们控制 input 不同状态的样式

* :focus : 选择获得焦点的表单元素（input标签获得焦点时）
* :enabled : 选择可用的表单元素（input标签没有禁用时）
* :disabled : 选择不可用的表单元素（input标签禁用时）
* :checked : 选择被选中的表单元素（单选或多选按钮选中时）
* :optional : 选择可选的表单元素（input标签没有 required 属性时）
* :required : 选择必填的表单元素（input标签有 required 属性时）
* :read-only : 选择只读的表单元素（input标签有 readonly 属性时）
* :read-write : 选择可读写的表单元素（input标签没有 readonly 属性时）
* :valid : 选择有效的表单元素（input标签内容符合要求时）
* :in-range : 选择范围内的表单元素（input标签内容在 min 和 max 之间时）
* :out-of-range : 选择范围外的表单元素（input标签内容不在 min 和 max 之间时）

### 属性

由于 CSS 属性实在是太多了，这里只列举一些少用但是很实用的属性以及使用方法

**all**

当你的页面引入了第三方 CSS 文件，但是你又想重置某些样式，可以使用 all 属性，只需要添加 `all: revert` 即可

```css 
.all-revert{
  all: revert;
}
```

**backface-visibility**

通常用于 3D 旋转时候，当元素旋转到背面时，[让背面的内容不可见]{如果页面有很多复杂的3D效果，而恰巧又需要背面不可见时，可以使用这个属性提升性能}。

```css
.backface-hidden {
  backface-visibility: hidden;
}
```

---

<BackFace />

---

**border-collapse**

用于设置表格的边框是否合并，合并后的表格边框看起来更加美观，默认值是 separate，即不合并。

```css
table {
  border-collapse: collapse;
}
```

---

<BorderCollapse />

---

**caption-side**

默认的表格标题是在表格的上方，如果想要将表格标题放在表格的下方，可以使用 caption-side 属性

```css
table {
  caption-side: bottom;
}
```

---

<CaptionSide />

---

**empty-cells**

用于设置表格中空单元格的显示方式，默认值是 show，即显示空单元格，如果想要隐藏空单元格，可以使用 empty-cells 属性

```css
table {
  empty-cells: hide;
}
```

---

<EmptyCells />

---

**clip-path**

进行图像的裁剪，可以使用 clip-path 属性，这个属性的值是一个路径，可以使用内置的路径，也可以使用自定义的路径。

[这个网站可以帮助调试生成CSS](https://bennettfeely.com/clippy/)

```css
.clip-path {
  clip-path: circle(50%);
}
```

**aspect-radio**

规定元素的宽高比例。使用时，只能给定 width 或者 height，同时使用的话，aspect-radio 不生效。

而且 文字内容会影响比例，可以通过 `overflow:hidden` 来保持比例

```css
div{
  height: 40px;
  background: red;
  aspect-ratio: 1 / 1; 
  overflow: hidden;
}
```

**outline**

input 标签自带了 outline 效果，视觉上表示强调的效果，原理上类似于这样的实现：

```css
input::focus {
  outline: 1px solid #000;
}
```

同样的，我们也可以在其它元素上使用它，使用方法和 border 类似，可以进行简写

```html
<style>
#app {
  outline: 4px dashed #000;
  border: 2px solid red;
  /* 可以用offset 来控制边框的偏移 */
  outline-offset: 5px; 
}
</style>

<div id="app">Hello</div>
```

---

<div id="app" border="2px solid red" outline="4px solid black" outline-offset-2>Hello</div>

---


**object-fit**

* contain 保证图片等比例完全显示
* cover 保证图片被填满，部分显示
* fill 拉伸图片，非原比例放大

---

<objectFit />

---

### CSS 变量

**使用方式**

通过 `--`声明，`var()` 访问

```css
:root {
  --box-height: 12px  
}

div {
  height: var(--box-height);
}
```

**优先级**

声明全局变量，一般在 `:root` 选择器中声明全局变量，这样可以让所有选择器都能够访问到

```css
:root {
  --main-color: red;
}
```

相对应的，存在局部变量，当全局变量和局部变量都存在的时候，会使用局部变量，下面的例子，三段文字的颜色是不一样的

```html
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```

**使用场景**

如果在项目中使用了 CSS 变量，无非就两个目的：

* 抽取公共变量，方便维护修改值
* 适配

而适配是最主要的场景，其中又可以根据屏幕宽度适配和主题适配

```css
/* 响应式适配 */
@media screen and (min-width: 768px) {
  :root {
    --main-color: pink;
  }
}

/* 暗黑模式适配 */
.dark-mode {
  :root {
    --main-color: pink;
  }
} 
```

**运算**

为了更加 CSS变量 灵活，允许对变量进行一定的运算，可以使用 `calc`，例如：

```diff
:root {
  --small: 20;
}

.app {
-  width: var(--small)px;  // 错误的写法
+  width: calc(var(--small) * 1px); // 正确的写法
}
```

### 多列

某些情况下，我们需要文字多列排布，类似于如下的效果

---

<style>
#columns-test p{
  column-count: 3;
  /* column-width: 100px; */
  column-gap: 40px;
  column-rule: 3px dashed green;
}
</style>

<div id="columns-test">
  <p>
  Front-end development focuses on the visual aspects of a website – the part that users see and interact with. Back-end development comprises a site's structure, system, data, and logic
  </p>
</div>

---


```html
<style>
#columns-test p{
  /* 指定列数 */
  column-count: 3;
  /* 或者列度 */
  /* column-width: 100px; */
  column-gap: 40px;
  column-rule: 3px dashed green;
}
</style>

<div id="columns-test">
  <p>
  Front-end development focuses on the visual aspects of a website – the part that users see and interact with. Back-end development comprises a site's structure, system, data, and logic
  </p>
</div>
```

### 动画库

动画是 CSS 最强大的功能之一，可以实现各种复杂炫酷的效果，想要写好 CSS 动画，除了考验代码功底，更多地是设计交互能力的体验，好在社区里也有大量动画库提供我们选择

**1.Animate.css** => <GitHubLink repo="animate-css/animate.css" />

最经典的动画库，内置了一些封装好的 CSS 动画类，引入 CSS 文件后就可以直接使用，使用方式非常简单，但是由于会引入整个 CSS 文件，体积会比较大

**2.cssanimation** => <GitHubLink repo="yesiamrocks/cssanimation.io" />

这个动画库的内容更加丰富，还内置了文字动画，让一个单词的不同字母可以不同时机出现和消失

**3.Animista** => https://animista.net/

这是一个在线网站，可以选取你需要的动画，然后拷贝对应的 CSS 代码到你的项目即可，所以几乎不会增大项目的体积

**4.angrytools** => https://angrytools.com/css/animation/

这个网站通过界面的形式调试 CSS 动画的细节，然后生成对应的代码

**5.hover.css** => <GitHubLink repo="IanLunn/Hover" />

专注于 **hover** 的动画交互，内置了丰富的 hover 动画类

**6.three dots** => <GitHubLink repo="nzbin/three-dots" />

由三个点组成的各种**加载**动画

**7.CSSshark** => <GitHubLink repo="elrumordelaluz/csshake" />

内置了各种 CSS **抖动**效果的动画

**8.hamburger** => <GitHubLink repo="jonsuh/hamburgers" />

关于 " <i class="i-material-symbols-menu"></i> " 图标的各种过渡变换效果

:::info
[这里有一个网站教你从头到尾实现一些CSS动画效果](https://cssanimation.rocks/)
:::

### Animation

**1.cubic-bezier** => https://cubic-bezier.com

调试贝塞尔曲线动画

----

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