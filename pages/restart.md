---
title: 重学前端
---

[[toc]]

> 记录我的重学之路

# HTML

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

## [历史](https://zh.wikipedia.org/wiki/HTML#%E5%8E%86%E5%8F%B2)

1990年发布第一版，2014年发布第五版，即HTML5

## [字符实体引用](https://zh.wikipedia.org/wiki/%E5%AD%97%E7%AC%A6%E5%AE%9E%E4%BD%93%E5%BC%95%E7%94%A8)

目的是为了提供一种对当前文档的编码方式不能包含的字符，例如 `< >`

格式为 `&name;`。例如 `&#60;`和`&lt;`都对应 `<`，又比如由于 HTML 会把空行、换行、多个空格都当成一个空格，所以多个空格的字符实体引用：`&nbsp;&nbsp;&nbsp;`可以实现连续空格的效果
  
## [`<!DOCTYPE html>`声明](https://www.runoob.com/tags/tag-doctype.html)

表示使用哪种 HTML 版本。HTML5 只有 `<!DOCTYPE html>` 一种，HTML4 有多种声明，分别是 Strict、Transitional 和 Frames

## `html lang`声明


`<html lang="en">` 表示使用哪种语言，这样浏览器或者相关插件就可以根据语言来进行翻译

## [`meta`声明](https://zh.wikipedia.org/wiki/Meta%E5%85%83%E7%B4%A0)

meta 是网页 head 的一部分，用于指定页面的编码、关键词、描述、作者、浏览器兼容性等信息

### charset

表示当前文档使用的字符编码，一般都是 UTF-8，如果有中文，一定要声明

### name

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

### http-equiv

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