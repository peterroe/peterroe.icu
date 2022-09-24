---
title: 重学前端
---

[[toc]]

> 记录我的重学之路

## HTML

标准结构

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
  
### [`<!DOCTYPE html>`声明](https://www.runoob.com/tags/tag-doctype.html)

表示使用哪种 HTML 版本。HTML5 只有 `<!DOCTYPE html>` 一种，HTML4 有多种声明，分别是 Strict、Transitional 和 Frames

### `html lang`声明


`<html lang="en">` 表示使用哪种语言，这样浏览器或者相关插件就可以根据语言来进行翻译

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

`<abbr>`标签定义缩写，当鼠标悬停在缩写上时，会显示完整的单词

```html
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.
```

例子： 

---

<RestartAbbr />

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

### 短语标签 Phrase Tags

这里指的是，一些不通过 CSS 来实现的文字装饰标签，包含我们最常用的 斜体、粗体、下划线、删除线等
```html
<!-- 斜体 -->
<i>斜体</i>
<em>斜体</em>

<!-- 粗体 -->
<b>粗体</b>
<strong>粗体</strong>

<!-- 下划线 -->
<u>下划线</u>
<ins>下划线</ins>

<!-- 删除线 -->
<s>删除线</s>
<del>删除线</del>

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