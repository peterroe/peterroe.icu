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

通常用于 3D 旋转时候，当元素旋转到背面时，让背面的内容不可见

```css
.backface-hidden {
  backface-visibility: hidden;
}
```

---

<BackFace />

---