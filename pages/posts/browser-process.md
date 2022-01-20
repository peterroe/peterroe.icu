---
title: 浏览器是如何渲染页面的
date: 2022-01-20
duration: 13min
---

[[toc]]

## 认识浏览器的多进程

* 浏览器是多进程的
* 浏览器之所以能够运行，是因为系统给它的进程分配的资源（CPU、memory cache）
* 可以简单理解，每一个Tab页面就是一个独立的浏览器进程

chrome任务管理器：

<img src="https://img-blog.csdnimg.cn/08692302f65546eb8ed4f8f25158b086.png" />

浏览器有自己的优化机制，注意到上图有些进程是会合并的，例如打开多个空Tab页，进程会被合并成一个。

## 浏览器的进程

浏览器是多进程的，通常认为运行浏览器后，会有下列几种类型的进程启动。

* 浏览器主进程
  * 负责协调主控，只有一个
  * 负责浏览器的界面显示，与用户交互。如前进后退等
  * 将渲染进程渲染后的`bitmap`，绘制到用户界面上
  * 网络资源的管理，下载等
* 第三方插件进程
  * 仅当使用插件时，创建对应的插件进程
* GPU进程
  * 负责3D的绘制，只有一个
* 渲染进程
  * 通常一个Tab页面对应一个渲染进程
  * 页面渲染，事件处理等

## 多进程的优点

相比于单进程浏览器，多进程有如下优点：

* 避免单个页面卡顿影响整个浏览器
* 避免第三方插件进程一次浏览器
* 利用现代计算机多核优势
* 方便沙盒隔离，提高安全性

## 渲染进程

浏览器的功能是显示页面，与用户交互，这必然离不开**渲染进程**的工作，接下来说说渲染进程的组成

简单来说，渲染进程下有五类线程

* GUI渲染线程
  * 负责渲染浏览器界面，解析`HTML、CSS`，布局和绘制等
  * 当页面需要**重绘和重排**时候，该进程就会工作
  * **GUI线程和JS执行线程互斥**
* JS引擎线程
  * 执行Js代码（例如V8）
  * 一个渲染进程只能有一个JS线程
* 事件触发线程
  * 归属于浏览器，用于**控制事件循环**
  * 当JS引擎执行代码如`setTimeout`时（或鼠标点击等），会将对应任务添加到事件线程中
* 定时器触发线程
  * 浏览器的计时器功能并非由JS引擎完成，而是单独开线程来计时
  * 计时完毕后，添加回调函数到事件队列中
* 异步http请求线程
  * 在`XMLHttpRequest`连接后新开一个线程请求
  * 如果设置有回调函数，就把函数放入事件队列中

<img m-auto border src="https://img-blog.csdnimg.cn/af8b0d02a8d942d881718895e56089b6.webp" />

## 页面的渲染

**页面的渲染由渲染进程完成**，接下来会详细讲解**渲染进程**是怎么渲染页面的

### 构建DOM树

浏览器无法直接理解和使用HTML，需要将HTML转换为浏览器能够理解的结构--DOM树

<img src="https://static001.geekbang.org/resource/image/12/79/125849ec56a3ea98d4b476c66c754f79.png" />

由上图可见，输入是HTML文件，输出是DOM树

### 样式计算

样式计算分为3步

**把CSS转换为浏览器都理解的结构**

CSS样式来源有三种

<img src="https://static001.geekbang.org/resource/image/bc/7c/bc93df7b8d03b2675f21e1d9e4e1407c.png" />

和HTML一样，浏览器也是无法直接理解这种纯文本的结构，需要转化为`styleSheets`，我们可以直接从控制台打印看到

<img src="https://static001.geekbang.org/resource/image/8e/ab/8ec7d5ecfadcd05b3f1ec762223a9aab.png" />

**标准化CSS属性值**

如`2em、blue、bold`这些值，浏览器并不能直接理解其值的含义，需要进行转换

<img src="https://static001.geekbang.org/resource/image/12/60/1252c6d3c1a51714606daa6bdad3a560.png" />

上图长度单位统一转化为`px`，颜色转为`rgb`形式，这样浏览器就能够理解了

**计算DOM树每个节点的具体样式**

现在，假设我们有如下`CSS样式`

```css
body { font-size: 20px; }
p { color:blue; }
span  { display: none; }
div { font-weight: bold; color:red }
div  p { color:green;}
```

应用于DOM节点过后，就是：

<img src="https://static001.geekbang.org/resource/image/fe/b4/fe9a0ea868dc02a3c4a59f6080aa80b4.png" />

我们可以在浏览器控制台看到DOM节点具体被应用的样式

<img src="https://static001.geekbang.org/resource/image/88/b2/88a3aac427cc7c09361eac01a85fc7b2.png" />

### 布局阶段

现在我们已经成功构建DOM树，并且把CSS样式精确分配到具体的节点中，接下来就是让这些CSS样式生效，产生布局

**创建布局树**

注意，DOM树是根据HTML结构生成的，其中有可能包含`display:none`的节点，那么就不应该出现在最后的树中。

所以在显示之前，我们还需要额外的构建一颗**只包含可见元素的布局树**

根据`DOM`树和`CompoutedStyle`构建：

<img src="https://static001.geekbang.org/resource/image/8e/0e/8e48b77dd48bdc509958e73b9935710e.png" />

从上图看出，DOM树中所有不可见的节点都没有包含到布局树中。

### 分层

经过了布局之后，每个元素的具体位置都被计算出来了，但是在绘制页面之前，还需要进行分层阶段

因为页面中有很多复杂的效果，例如3D变化、页面滚动等，为了更方便地实现这些效果，**渲染引擎还需要为特定的节点生成专用的图层，并生成一棵树（LayerTree）**。

原因很简单，假如不分层。例如3D变化，你可能不想因为一个图形的简单旋转而重绘制整个页面（因为所有的都在一个层上），而分层之后，可以只重绘特定的层，大大减少了资源的消耗

而浏览器对页面分层的结果我们也可以直接看到，打开控制台的图层（Layer）即可看到：

<img src="https://static001.geekbang.org/resource/image/e2/c0/e2c917edf5119cddfbec9481372f8fc0.png" />

所以我们看到的页面是许多的图层叠加在一起，**浏览器的页面实际上被分成了很多图层，这些图层叠加后合成了最终的页面**

如果我们使用像`position、transform`等属性应用与DOM节点，那么浏览器就会自动将它提升为一个层

通常情况下，并不是每个节点都包含一个图层（防止资源浪费），所以一个节点如果没有对应的层，那么就属于父节点的图层

**提升为层的条件**

1. **有[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)的属性的元素会被单独提升为一层**

总的来说，比较常见的做法是：

* **position** 为 `absolute`或`relative`，且`z-index`不为`auto`的元素
* **postion** 为 `fixed`或`sticky`的元素
* **flex/grid** 容器的子元素，且`z-index`不为auto
* **opacity** 小于1的元素
* 以下属性值不为`none`的元素
  * transform
  * filter
  * perspective
  * clip-path
  * mask/mask-image/mask-border
* **will-change** 为任意属性而该属性在**非默认**值时会创建层叠上下文的元素

其中解释一下`will-change`属性，实际上，它的使用频率是很高的，通常用于把节点提升为单独的一层然后提高节省动画性能消耗

```html
<style>
  .app {
    will-change: transform;
    width: 20px;
    transform: rotate(30deg);
  }
</style>

<div class="app">
  Hello
</div>
```

上面的代码利用了`will-change`把节点提升为一个层：

<img border src="https://img-blog.csdnimg.cn/e8861967cb5645d0b83b7a0c8c796d8a.png" />

实际上由于各个浏览器的实现不一致，即使提升为了层叠上下文也不一定会创建层，例如使用如下代码，就没有层的效果：

```html
<style>
  .app {
    /* will-change: transform; */
    width: 20px;
    transform: rotate(30deg);
  }
</style>

<div class="app">
  Hello
</div>
```

<img border src="https://img-blog.csdnimg.cn/8243a9bf8cfe4076bcf5fb0753044fe0.png" />

可以通过`will-change`属性，确保提升为一个层

2. **需要被裁剪的地方会被创建图层**

最常见的裁剪就是`overflow: auto/scroll`，出现滚动条

<img src="https://static001.geekbang.org/resource/image/7b/97/7b6ceaab23c6c6d8e5930864ff9d7097.png" />

注意是出现了滚动条，进行了**裁剪**，才会被提升为层，不只是声明`overflow`，如若没有进行裁剪，依旧不会被提升

***

### 图层绘制

进行了分层之后，接下来就是绘制这些图层，你可以打开控制台看看每个图层对应的绘制情况

<img src="https://img-blog.csdnimg.cn/ea642663a35d44c9bb8db33dd597cf0a.png" />

左边每一条信息对应了右边某一个图层

注意：虽然在图层绘制阶段，出现了**绘制**两个字，但是没有进行实际的绘制，只是生成**绘制列表**

<img src="https://static001.geekbang.org/resource/image/40/08/40825a55214a7990bba6b9bec6e54108.png" />

绘制列表中是一些指令，指导如何去绘制，通常绘制一个元素需要好几条绘制指令。所以在**图层绘制阶段**，输出的内容是待绘制列表

***

### 栅格化（raster）操作

在讲解栅格化之前，你需要知道，在上面说的页面渲染，都是在渲染进程中完成，而且是在主线程中完成的（也就是GUI渲染线程），接下来的栅格化，会交给**合成线程**来完成

<img src="https://static001.geekbang.org/resource/image/40/08/40825a55214a7990bba6b9bec6e54108.png" />

合成线程没有在最开始渲染进程的组成中提及，但也应该把它视为渲染进程的一部分

当图层的绘制列表准备好之后，主线程会把绘制列表**提交给合成线程**，那么合成线程是如何工作的呢？

我们要知道，为了节省渲染的资源消耗，浏览器只会绘制视口附近的元素

<img src="https://static001.geekbang.org/resource/image/24/72/242225112f2a3ec97e736c960b88d972.png" />

证明也很简单：

<img src="https://img-blog.csdnimg.cn/fa94e978f2d747fca6eb7e71bdb1e951.png" />

好了，基于这个原因，合成线程会将图层划分为图块，这些图块的大小通常为`512*512`或者`256*256`

<img src="https://static001.geekbang.org/resource/image/bc/52/bcc7f6983d5ece8e2dd716f431d0e052.png" />

合成线程会按照视口附件的图块来优先生成位图，**实际生成位图的操作是由栅格化来完成的。所谓栅格化，是将图块转化为位图**，而图块是栅格化执行的最小单位。渲染进程还维护了一个栅格化线程池，所有的图块栅格化都是在线程池内执行的

<img src="https://static001.geekbang.org/resource/image/d8/20/d8d77356211e12b47bb9f508e2db8520.png" />

从上图可以看到，主线程把绘制列表交由合成线程之后，合成线程通过调用底部的栅格化线程池完成图块转化为位图的操作

通常，栅格化的过程会使用**GPU**来加速，使用GPU生成位图的过程交过GPU栅格化，生成的位图保存在**GPU内存中**

<img src="https://static001.geekbang.org/resource/image/a8/87/a8d954cd8e4722ee03d14afaa14c3987.png" />

***

### 合成和显示

一旦所有图块都被光栅化，合成线程会生成一个绘制图块的命令--DrawQuad，去通知浏览器主进程

主浏览器进程里面有一个叫viz的组件，用来接收合成线程发过来的DrawQuad命令，然后将页面内容绘制到内存中

总的说就是合成线程**通知主浏览器进程该去GPU内存里面拿位图并显示出来了**

<img src="https://static001.geekbang.org/resource/image/97/37/975fcbf7f83cc20d216f3d68a85d0f37.png" />

宏观来看，`GPU、主进程、渲染进程`三者由如下关系

<img m-auto src="https://img-blog.csdnimg.cn/390d200fbcd54268ab63a2f3efefa121.webp" />

总结我们的页面渲染过程，就是：

* 渲染进程（主进程）将HTML内容转化为可以理解的**DOM树**结构
* 渲染进程（主进程）将CSS样式表转化为可以理解的**styleSheets**，计算出DOM节点的样式
* 创建布局树，忽略不显示的元素，并计算元素的布局信息
* 对布局树进行分层，生成**分层树**
* 为每个层生成绘制列表，提交给**合成线程**
* 合成线程将图层分成**图块**，并在栅格化线程池中将图块转换成位图
* 合成线程发送命令给浏览器主进程
* 浏览器主进程**生成页面**，并显示到显示器上

## 重绘、重排、合成？

看完上面这写，我们来说说前端老生常谈的重绘、重排，相信你会有新的理解。

**重排**

我们所谓重排指的是元素的几何属性发生变化，先看看下图：

<img src="https://static001.geekbang.org/resource/image/b3/e5/b3ed565230fe4f5c1886304a8ff754e5.png" />

可以看出，通过Javascript或者CSS修改元素的集合位置，那么浏览器会触发**重新布局**，解析之后的一系列子阶段，这个过程就叫重排。无疑，**重排需要更新完整的渲染流水线，所以开销也是最大的**

**重绘**

重绘指的是更改元素的绘制属性，看看下图：

<img src="https://static001.geekbang.org/resource/image/3c/03/3c1b7310648cccbf6aa4a42ad0202b03.png" />

从图中可以看出，如果修改了元素的背景颜色，那么布局阶段将不会被执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段，这个过程就叫重绘。相较于重排操作，**重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。**

**合成**

相比于重绘重排，**合成**对于我们来说比较陌生，但也很好理解，当我们改变了一个**既不影响布局，又不影响绘制的属性**，渲染引擎将跳过布局和绘制，只执行后续的合成操作，我们把这个过程叫做**合成**

<img src="https://static001.geekbang.org/resource/image/02/2c/024bf6c83b8146d267f476555d953a2c.png" />

在上图中，我们使用了 CSS 的 transform 来实现动画效果，这可以避开重排和重绘阶段，直接在非主线程上执行合成动画操作，所以**相对于重绘和重排，合成能大大提升绘制效率**

部分图片和文字来源于：[https://time.geekbang.org/column/article/118826](https://time.geekbang.org/column/article/118826)