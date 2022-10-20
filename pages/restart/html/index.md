---
title: HTML
---

[[toc]]

### 标准结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  <div id="app">Hello World</div>
</body>
</html>
```

### [历史](https://zh.wikipedia.org/wiki/HTML#%E5%8E%86%E5%8F%B2)

1990年发布第一版，2014年发布第五版，即HTML5

### [字符实体引用](https://zh.wikipedia.org/wiki/%E5%AD%97%E7%AC%A6%E5%AE%9E%E4%BD%93%E5%BC%95%E7%94%A8)

目的是为了提供一种对当前文档的编码方式不能包含的字符，例如 `< >`

格式为 `&name;`。例如 `&#60;`和`&lt;`都对应 `<`，又比如由于 HTML 会把空行、换行、多个空格都当成一个空格，所以多个空格的字符实体引用：`&nbsp;&nbsp;&nbsp;`可以实现连续空格的效果

你也可以在 HTML 中使用字符实体表示 emoji，例如 `&#128516;`表示😄，[查看更多](https://www.runoob.com/tags/html-emoji.html)
  
### [`<!DOCTYPE html>`声明](https://www.runoob.com/tags/tag-doctype.html)

表示使用哪种 HTML 版本。HTML5 只有 `<!DOCTYPE html>` 一种，HTML4 有多种声明，分别是 Strict、Transitional 和 Frames

### `html lang`声明

`<html lang="en">` 表示使用哪种语言，之所以 lang 属性写在 html 标签上，是因为想把所有的内容都为其定义 lang，但其实这是一个**全局属性**，可以为任意标签添加此属性

所以我们还可以进行局部 lang 声明，例如 `<p lang="fr">Français</p>`

声明 lang 的作用其实主要有两点：

* 方便浏览器及搜索引擎识别网页语言
* 开发者根据不同的 lang 改变整个页面或者局部页面的 CSS 文字样式（有专门的lang伪类选择器）

### [`meta`声明](https://zh.wikipedia.org/wiki/Meta%E5%85%83%E7%B4%A0)

meta 是网页 head 的一部分，用于指定页面的编码、关键词、描述、作者、浏览器兼容性等信息

#### charset

表示当前文档使用的字符编码，一般都是 UTF-8，如果有中文，一定要声明

#### name

name 属性用于描述网页，与之对应的值是 content，例如：

```html
<!-- keywords用来告诉搜索引擎你网页的关键字是什么 -->
<meta name="keywords" content="HTML, CSS, JavaScript">
<!-- description用来告诉搜索引擎你的网站主要内容 -->
<meta name="description" content="Free Web tutorials on HTML and CSS">
<!-- 标注网页的作者 -->
<meta name="author" content="Peter Roe">
<!-- robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引 -->
<meta name="robots" content="index, follow">
<!-- 生成此页面的软件的标识符 -->
<meta name="generator" content="Hugo 0.80.0">
<!-- 标注版权 -->
<meta name="copyright" content="Peter Roe">
```

有上面这些信息可以帮助网页被搜索引擎更好的收录，即我们通常说的 SEO 优化

viewport 值得单独拿出来说一下。早期我们都是以PC端为标准开发的网页，没有做移动端适配。那么在手机上看就会被挤得很小或者布局混乱。这个属性可以帮助我们改善移动端的体验。例如：帮助用户通过平移和缩放来看网页的不同部分

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

* width : 控制viewport的大小，可以指定一个值，如600， 或者特殊的值，如device-width为设备的宽度（单位是缩放为100%的CSS的像素）,如果不显示地设置viewport，那么width的默认为980
* height : 和width相对应，指定高度
* initial-scale : 初始缩放比例，页面第一次加载时的缩放比例
* maximum-scale : 允许用户缩放到的最大比例，范围从0到10.0
* minimum-scale : 允许用户缩放到的最小比例，范围从0到10.0
* user-scalable : 用户是否可以手动缩放，值可以是：① yes、 true允许用户缩放；② no、false不允许用户缩放

#### http-equiv

相当于http头文件的作用，它可以向浏览器传回一些有用的信息，对应的值也是 content

```html
<!-- 设定网页的到期时间，一旦过期，必须到服务器上重新传输 -->
<meta http-equiv="expires" content="Fri,12 Jan 2001 18:18:18 GMT">
<!-- 禁止浏览器从本地计算机缓存页面内容：访问者将无法脱机浏览 -->
<meta http-equiv="Pragma" content="no-cache">
<!-- 自动刷新跳转到新页面：5秒后跳转到 http://www.petereror.icu -->
<meta http-equiv="Refresh" content="5;url=http://www.petereror.icu">
<!-- 如果网页过期，那么存盘的cookie将被删除 -->
<meta http-equiv="Set-Cookie" content="cookievalue=xxx; expires=Friday,12-Jan-2001 18:18:18 GMT; path=/">
<!-- 强制页面在当前窗口以独立页面显示：防止页面被他人iframe调用 -->
<meta http-equiv="Window-target" content="_top">
<!-- 当前页面的MIME类型及编码类型 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- 当前目标受众的语言类型 -->
<meta http-equiv="Content-Language" content="zh-cn" />
```

上文有一个注意点在于 Content-Type 只是定义了返回的页面 MIME 类型和编码类型。但是实际在浏览器展现的时候，浏览器还是根据 `<meta charset>` 来确定的

而 `<html lang>`和`<meta http-equiv="Content-Language">`区别可以[看这里](https://www.it1352.com/865676.html)

### 普通标签

[HTML5所有标签](https://www.runoob.com/tags/html-reference.html)

#### [map](https://www.zhangxinxu.com/wordpress/2017/05/html-area-map/)

`<map>`和`<area>`通常一起出现，用于定义图像映射，即点击图像上的某个区域，跳转到另一个页面



```html
<img src="map.jpg" usemap="#map" />

<map name="map" id="map">
     <area shape="rect" coords="20,20,80,80" href="#rect" alt="矩形">
    <area shape="circle" coords="200,50,50" href="#circle" alt="圆形">
    <area shape="poly" coords="150,100,200,120,180,130,190,180,150,150,100,160,140,120,100,110" href="#poly" alt="多边形">
</map>
```

这样就可以点击同一张图片的不同区域，从而跳转到不同的网站，可以通过它实现一个最简单的地图组件

热区图片支持**矩形、圆形、多边形**三种形状，通过`shape`属性来定义，`coords`属性来定义坐标

#### [abbr](https://www.runoob.com/tags/tag-abbr.html)

`<abbr>`标签定义缩写，当鼠标悬停在缩写上时，会显示完整的单词。

值得注意的是，abbr 标签只有语义以及下划线的 CSS 效果，**悬停显示的效果来自于全局属性title**

```html
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948. <br />
The <span title="World Health Organization">WHO</span> was founded in 1948.
```

例子： 

---

The <abbr title="World Health Organization">WHO</abbr> was founded in 1948. <br />
The <span title="World Health Organization">WHO</span> was founded in 1948.

---

#### address

`<address>`标签定义文档或文章的作者/拥有者的联系信息

在样式上，会将包裹的文字变为斜体

语义上，也会所处的位置有不同的含义

* 如果`<address>`标签位于`<body>`标签内部，则它表示该文档作者/所有者的联系信息。

* 如果`<address>`标签位于`<article>`标签内部，则它表示该文章作者/所有者的联系信息。

```html
<address>
Written by <a href="peterroe@163.com">Peter Roe</a>.<br> 
Visit me at <a href="https://peterroe.icu">Blog</a><br>
</address>
```

#### code

用于包含计算机代码，通常用于在文章中显示代码段，通常用作语义标签

这对例如浏览器翻译插件来说，**避免**错将代码段翻译成其他语言很有好处

```html
Regular text. <code>This is code.</code> Regular text.
```

#### [dialog](https://www.lidihuo.com/html/html-tags-dialog.html)

原生弹窗的实现，可以配合 JS，实现弹窗的显示和隐藏，示例：

```html
<div>
  <dialog id="myFirstDialog">
    您好，欢迎来到我的博客！
    <button id="hide">关闭</button>
  </dialog>
  <button id="show">显示 Dialog</button>
</div>

<script>
  var dialog = document.getElementById('myFirstDialog');
  document.getElementById('show').onclick = function() {
      dialog.show();
  };
  document.getElementById('hide').onclick = function() {
      dialog.close();
  };
</script>

```

---

<RestartDialog />

---

#### base 

`<base>` 用于定义页面中所有链接的默认地址或默认目标，它是一个空标签，只有两个属性，且都是必须的

```html
<head>
  <base href="https://peterroe.icu" target="_blank">
</head>
 
<body>
  <img src="favicon.ico">
  <a href="restart">重学前端</a>
</body>
```

#### wbr 

wbr 标签用于在长字符串中添加换行符，以防止浏览器无法自动换行

例如我们有一个较长的单词，但是浏览器不知道如何换行最好，这时候我们可以使用`<wbr>`标签来提示浏览器拆分单词

```html
<p>学习 AJAX ,您必须熟悉 <wbr>Http<wbr>Request 对象。</p>
```

从下面的例子可以看到，指定 wbr 后，根据不同的容器宽度，浏览器会进行智能换行

---

<RestartWbr />

---

#### template

熟悉 Vue 的小伙伴对这个标签应该不陌生，它是用来定义 Vue 的模板的

在这一点上和原生 HTML 的 template 标签含义保持一致：

> `<template>` 标签定义在页面加载时隐藏的一些内容，该标签中的内容可以稍后使用 JavaScript 呈现

```html
<template>
  <div class="myClass">我喜欢: </div>
</template>
 
<script>
var myArr = ["Google", "Runoob", "Taobao", "Wiki", "Zhihu", "Baidu"];
function showContent() {
  var temp, item, a, i;
  temp = document.getElementsByTagName("template")[0];
  item = temp.content.querySelector("div");
  for (i = 0; i < myArr.length; i++) {
    a = document.importNode(item, true);
    a.textContent += myArr[i];
    document.body.appendChild(a);
  }
}
// showContent()
</script>
```

#### time

time 标签用于定义日期/时间，样式没有变化，实现了 HTMLTIMEElement 接口，可以通过`dateTime`属性获取时间

```html
我在 <time datetime="2016-02-14">情人节</time> 有个约会

<script>
  var time = document.querySelector('time');
  console.log(time.dateTime); // 2016-02-14
</script>
```

#### details

details 标签用于定义一个细节，可以通过`open`属性来控制初态是否展开，结合 summary 标签可以实现一个可折叠的内容

```html
<details open>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>
```

---

<details open>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>

---

#### ruby

ruby 标签用于定义 ruby 注释，即在文字旁边添加注释，可以用来标注拼音、音标等

在东亚使用，显示的是东亚字符的发音

```html
<ruby>
  <rb>英雄</rb>
  <rt>Ying Xiong</rt>
  <rp>(备用内容)</rp>
</ruby>
```

---

<ruby>
    <rb>英雄</rb>
    <rt>Ying Xiong</rt>
    <rp>(备用内容)</rp>
</ruby>

---

#### datalist

datalist 标签用于定义输入域的选项列表，配合 input 标签的 list 属性使用，可以做到一种类似于自动补全的效果

```html
<input list="browsers" />
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```

---

<input list="browsers" all-revert />
<datalist id="browsers">
  <option value="Internet Explorer" />
  <option value="Firefox" />
  <option value="Chrome" />
  <option value="Opera" />
  <option value="Safari" />
</datalist>

---

#### fieldset

fieldset 标签用于定义一个数据区域，配合 legend 标签控制标题的内容，经常结合表单使用

```html
<form>
  <fieldset>
    <legend>Personalia:</legend>
    Name: <input type="text"><br>
    Email: <input type="text"><br>
    Date of birth: <input type="text">
  </fieldset>
</form>
```

---

<form>
  <fieldset revert p-4>
    <legend>Personalia:</legend>
    Name: <input type="text" revert mt-1/><br>
    Email: <input type="text" revert mt-1/><br>
    Date of birth: <input type="text" revert mt-1>
  </fieldset>
</form>

---

#### cite 

cite 标签用来定义作品（比如书籍、歌曲、电影、电视节目、绘画、雕塑等等）的标题，例如：

```html
<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
```

样式上表现为斜体，所以也是一个语义标签，有利于例如爬虫可以根据这个标签抓取一篇文档引用的所有作品

---

<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>

---

#### ins

del 和 ins 一起使用，描述文档中的更新和修正。浏览器通常会在已删除文本上添加一条删除线，在新插入文本下添加一条下划线

```html
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
```

---

<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>

---

#### figure

figure 元素的内容应该和主内容相关，但如果被删除，则不应该对文档流产生影响 

```html
<figure>
  <img src="/download.png" alt="">
  <figcaption>caption and descriptions</figcaption>
</figure>
```

---

<figure>
  <img src="/download.png" alt="">
  <figcaption>caption and descriptions</figcaption>
</figure>

---

#### pre

之前提到，浏览器会将多个空格合并为一个空格，而 pre 标签用于定义预格式化的文本，文本中的空格和换行都会被**保留**，所以通常用于显示源代码

```html
<pre>
let a = 2
let b = 3
a + b
</pre>
```

---

<pre>
let a = 2
let b = 3
a + b
</pre>

---

#### a

把 a 标签拿出来说是因为，除了跳转一个链接之外，它还有一些其他的用法

```html
<!-- 打开电子邮件客户端，并填入地址 -->
<a href="mailto:peterroe@163.com">peteroe@163.com</a>
<!-- 让用户设备设备呼叫链接的号码 -->
<a href="tel:110">110</a>
<!-- 打开短信程序并预填号码 -->
<a href="sms:110">120</a>
<!-- 下载文件而不跳转 -->
<a href="https://peterroe.icu/favicon.ico" download>120</a>
```

---

<a href="mailto:peterroe@163.com">peteroe@163.com</a> <br />
<a href="tel:110">110</a> <br />
<a href="sms:110">120</a> <br />
<a href="https://peterroe.icu/favicon.ico" download>download</a>

---

#### input

input 标签也值得一讲，因为它是表单中最常用的标签之一，type 取值丰富，[这里可以看到更详细的解释](https://www.php.cn/manual/view/35395.html)

包括 `button、checkbox、color、date、datetime、datetime-local、email、file、hidden、image、month、number、password、radio、range、reset、search、submit、tel、text、time、url、week`



`<input type="button" value="button" />`（普通按钮）

<input type="button" value="button" placeholder="radio" revert />  <br />  

`<input type="checkbox" />`（多选框）

<input type="checkbox" placeholder="checkbox" />  <br />

`<input type="color" />`（颜色选择器）

<input type="color" revert placeholder="请输入颜色" /> <br />

`<input type="date" />`（年月日选择器）

<input type="date" revert placeholder="请输入日期" /> <br />

`<input type="datetime" placeholder="请输入日期时间" />`（不鼓励使用）

<input type="datetime" revert placeholder="请输入日期时间" /> <br />

`<input type="datetime-local" />`（年月日时分选择器，鼓励使用）

<input type="datetime-local" revert placeholder="请输入本地日期时间" /> <br />

`<input type="email" placeholder="请输入邮箱" />`（对拉起键盘优化，如联想邮箱后缀，语义化，使用和type=text一样）

<input type="email" revert placeholder="请输入邮箱" /> <br />

`<input type="file" placeholder="请输入文件" />`（选择文件）

<input type="file" placeholder="请输入文件" /> <br />

`<input type="hidden" />`（想利用`<form>`提交，但又不想用户在界面看见的某些字段）

<input type="hidden" revert/> <br />

`<input type="image" src="https://peterroe.icu/favicon.ico" />`（同type=submit但是是图片）

<input type="image" src="https://peterroe.icu/favicon.ico" revert/> <br />

`<input type="month" />`（年月选择器）

<input type="month" revert placeholder="请输入月份" /> <br />

`<input type="number" placeholder="请输入数字" />`（数字输入框）

<input type="number" revert placeholder="请输入数字" /> <br />

`<input type="password" placeholder="请输入密码" />`（密码输入框）

<input type="password" revert placeholder="请输入密码" /> <br />

`<input type="radio" />`（单选框）

<input type="radio" placeholder="radio" /> <br />

`<input type="range" />`（范围选择器）

<input type="range" revert placeholder="请输入范围" /> <br />

`<input type="reset" value="重置" />`（重置表单字段）

<input type="reset" revert value="重置" /> <br />

`<input type="search" />`（让拉起的键盘，回车处显示“搜索”字样，并且有清除功能）

<input type="search" revert value="搜索" /> <br />

`<input type="submit" value="提交" />`（提交表单）

<input type="submit" revert value="提交" /> <br />

`<input type="tel" placeholder="请输入电话" />`（尽可能拉起数字键盘，语义化，其他和type=text一致）

<input type="tel" revert placeholder="请输入电话" /> <br />

`<input type="text" revert placeholder="请输入内容" />`（普通输入框）

<input type="text" revert placeholder="请输入内容" /> <br />

`<input type="time" />`（时分选择器）

<input type="time" revert placeholder="请输入时间" /> <br />

`<input type="url" placeholder="请输入网址" />`（尽可能键盘优化，例如联想.com，语义化，其他和type=text一致）

<input type="url" revert placeholder="请输入网址" /> <br />

`<input type="week" />`（周选择器）

<input type="week" revert placeholder="请输入周" /> <br />



### 短语标签 Phrase Tags

这里指的是，一些不通过 CSS 来实现的文字装饰标签，包含我们最常用的 斜体、粗体、下划线、删除线等
```html
<!-- 斜体 -->
<i>斜体</i>  <!-- 单纯想要斜体样式 -->
<em>斜体</em> <!-- 强调语义的斜体 -->

<!-- 粗体 -->
<b>粗体</b>  <!-- 单纯想要粗体样式 -->
<strong>粗体</strong>  <!-- 强调语义的粗体 -->

<!-- 下划线 -->
<u>下划线</u> <!-- 单纯想要下划线样式 -->
<ins>下划线</ins>  <!-- 表示替代内容，和del搭配使用 -->

<!-- 删除线 -->
<s>删除线</s>  <!-- 单纯想要斜体样式 -->
<del>删除线</del>  <!-- 表示删除内容，和ins搭配使用 -->

<!-- 高亮 -->
<mark>高亮</mark>

<!-- 缩写 -->
<abbr title="完整的名字">缩写</abbr>

<!-- 双向覆盖 -->
<bdo dir="rtl">hello world</bdo>

<!-- 双向隔离 -->
<bdi>hello world</bdi>

<!-- 文字引用 -->
所谓的诺言只是<q>戴</q>着双引号的谎言

<!-- 段落引用 -->
<blockquote>生如夏花之绚烂，死如秋叶之静美。</blockquote>

<!-- 定义变量 -->
<code>document.write("<var>user-name</var>")</code>

<!-- 定义键盘命令 -->
保存文件请使用快捷键 <kbd>Ctrl</kbd> + <kbd>S</kbd>

<!-- 术语定义 -->
<dfn>HTML</dfn> 是创建网页的标准标记语言

<!-- 标识计算机输出 -->
<samp>这是计算机输出的内容</samp>
```

### 一些全局属性

所谓 HTML 全局属性，其实就是我们日常在可以在所有 HTML 标签上使用的属性，像 class，is，style 等等

在上面其实已经提到了像 lang 和 title 这样的全局属性，除此之外，还有一些全局属性值得了解

**conteneditable**

可以让指定元素的内容可编辑

```html
<p contenteditable="true">这是一段可编辑的内容</p>
```

---

<p contenteditable="true">这是一段可编辑的内容</p>

---

::: info
有意思的是我们可以在浏览器 URL 栏中输入：`data:text/html, <html contenteditable>`，让整个页面变成编辑器！
:::

**draggable**

这个属性用于指定元素是否可以拖动，配合浏览器提供的拖放 API，可以实现很多有趣的功能

```html 
<p draggable="true">这是一段可移动的段落。请把该段落拖入上面的矩形。</p>
```

---

<RestartDraggable />

---

**accesskey**

这个属性用于指定一个快捷键，可以用键盘来快速访问元素，不同的浏览器，访问方式略有不同

```html
<a href="https://github.com/peterroe" accesskey="g">My Github</a><br>
<a href="https://peterroe.icu" accesskey="w">My Website</a>
```

Browser | Windows |	Linux |	Mac
:---:|:---:|:---:|:---:
Chrome |	[Alt] + accesskey |	[Alt] + accesskey	[Control] |  [Alt] + accesskey
Firefox |	[Alt] [Shift] + accesskey |	[Alt] [Shift] + accesskey |	[Control] [Alt] + accesskey
Safari |	[Alt] + accesskey |	N/A |	[Control] [Alt] + accesskey
---

<a href="https://github.com/peterroe" accesskey="g">My Github</a><br>
<a href="https://peterroe.icu" accesskey="w">My Profile</a>

---

**hidden**

其实 HTML 标签都有一个属性 hidden，控制元素是否显示

```html
<div hidden>我消失了</div>
```

究其原理，如果用浏览器控制台查看元素，你会发现其实本质上还是用了 CSS 的 display: none 来隐藏元素的

```css
[hidden] {
    display: none;
}
```

**tabindex**

我们知道，用 Tab 键可以在页面上切换焦点，而 tabindex 属性就是用来控制焦点的顺序的

```html
<a href="//www.github.com//" tabindex="2">GitHub</a><br />
<a href="//www.google.com/" tabindex="1">Google</a><br />
<a href="//www.microsoft.com/" tabindex="3">Microsoft</a>
```

**data-***

可以用来绑定一些数据到 DOM 元素上，访问的时候通过 dataset 属性来获取

```html
<div id="app" data-name="Peter" onclick="showName(event)">sdf</div>

<script>
  function showName(e) {
      console.log(e.target.dataset.name);
  }
</script>
```

这种技巧是可选的，因为我们通常可以将数据绑定在 JS 函数参数上

```html
<div id="app" onclick="showName(event, 'Peter')">sdf</div>

<script>
  function showName(e, name) {
      console.log(e.target, name);
  }
</script>
```

不过你如果想要在 HTML 中直接绑定数据，脱离 JS的函数参数绑定，那么 data-* 就是一个不错的选择。某些场景，例如图片懒加载，就会用 data-img 来绑定图片地址

// shadowdom

### 拓展

* [被废弃的HTML标签](/restart/html/delete-reason)
* [高频面试题](/restart/html/interview)