---
title: File in browser
date: 2022-10-27
---

[[toc]]

## 上传文件

想要上传文件可以使用 `<input type=file />` ，这是通用的做法（但不是唯一的，下文会提到）

<input revert type="file"/>

上面是标签的效果。要想捕获上传的文件，需要监听 `change` 事件，然后在 `event.target.files` 中就可以获取

```html
<div>
  <input type="file"/>
</div>
<script >
  document.querySelector('input').onchange = (event) =>   {
      console.log(event.target.files)
  }
</script>
```

为什么是 `files` 而不是 `file` ？

因为浏览器是支持多文件上传的，只需要在 `input` 标签上加上 `multiple` 属性，就可以支持多文件

所以理所应当，`files` 应该是复数结构。确切的说是一个**伪数组**，它是 [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList) 类的实例

```js
event.target.files instanceof FileList // => true
```

**FileList**

打印的结构是这样的：

<img src="https://raw.githubusercontent.com/peterroe/static-img/master/202210271050321.png?token=AOFHDGHN75TLHURBDYHMZ3DDLHZCC" v-viewer/>

每一项是 `File` 类的实例，有一个 `length` 代表文件的个数，还有一个 `item` 方法，和下标访问等价：

```js
event.target.files.item(0) instanceof File // => true
```

## File 和 Blob

File 类继承于 Blob 类，和 Object 关系如下：

```js
File.prototype.__proto__.constructor === Blob
Blob.prototype.__proto__.constructor === Object
```

由于继承关系，所以 File 可以在使用 Blob 的任意上下文中使用，例如 `FileReader、URL.createObjectURL()、createImageBitmap()、 XMLHttpRequest.send()`

在上面我们看到，File 实例上有五个属性

* lastModified
* lastModifiedDate
* name
* size
* type
* webkitRelativePath

我们可以通过上面的信息识别：名称、类型、大小

在这个对象上，我们并不能看到文件的内容，因为文件是二进制的形式储存，并不能直接展示出来，要想获取文件的内容，需要使用 `FileReader`，使用方法很简单，创建一个实例，监听事件，然后可以调用它的几个方法，

**BlobToBase64**

```js
// ...
let file = event.target.files[0]
let reader = new FileReader()
reader.onload = (e) => {
  console.log(e.target.result)
} 

// 下面这四个方法参数支持 Blob 类型，所以也支持 File 类型
reader.readAsDataURL(file) // base64 字符串
reader.readAsArrayBuffer(file) // ArrayBuffer
reader.readAsBinaryString(file) // 二进制字符串
reader.readAsText(file) // 文本字符串
```

所以我们一般通过 `readAsDataURL` 来拿到文件的 base64 形式，这个时候我们可以通过 canvas 读取 base64 ，对图片进行压缩。压缩完成后再转回 Blob 对象

```js
canvas.toDataURL() 
canvas.toBlob()
```

如果是非图片的 base64 转换为 Blob，需要用到其他方法转换

**base64ToBlob**

最简单方法是通过 fetch 进行转换

```js
// ...
const base64 = e.target.result 

const blob = await fetch(base64).then(b => b.blob())
```

当然，也有更加正式的方法提供选择：[`atob`](https://developer.mozilla.org/zh-CN/docs/Web/API/atob)，但是更加复杂

## [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

Formdata 允许携带二进制数据，所以通常用于上传文件

```js
const form = new FormData()
// key 任意，value 可以是 Blob 对象
form.append('file', e.target.files[0])

// 发送方式可以任意： ajax、fetch、axios，但是要注意加上请求头文件类型
request.send(form)
```

## 进度监控

**xhr**

可以通过监听 xhr 的事件，来判断上传进度

```js
xhr.addEventListener('progress', (evt) => {
  // 计算进度百分比
  var percentComplete = (evt.loaded / evt.total) * 100;
})
```

当然，上传的耗时主要是体现在**文件的上传**，我们可以单独监听文件上传的进度：

```js
 var xhr = new XMLHttpRequest();
  xhr.upload.onloadstart = function(){//上传开始
      //...
  };
  xhr.upload.onprogress = function(evt){
    // 计算进度百分比
    var percentComplete = (evt.loaded / evt.total) * 100;
  };
```

**fetch**

遗憾的是，关于 fetch 的上传进度监控，目前还没有一个通用的规范，如果你坚持为你的网站添加上传进度功能，我仍然建议您使用 ajax 或者 axios

[**Progress Event**](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)

还有一些标签的加载也都实现了进度事件：

`<img>、<audio>、<video>、<style>、<link>`

## 读/写

处于安全性的考虑，在浏览器中的 JS 并没有直接的读写文件的能力，关上了“门”的同时，也保留了一扇“窗”，因为需要用户手势才能触发读写 API。

通常来说，我们会利用 input file 来读取用户的文件

```html
<input type="file" />
```

通过访问 URL，来下载对应的文件（[需要配置资源响应头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition#%E4%BD%9C%E4%B8%BA%E6%B6%88%E6%81%AF%E4%B8%BB%E4%BD%93%E4%B8%AD%E7%9A%84%E6%B6%88%E6%81%AF%E5%A4%B4)）：

```js
window.location.href = 'xxxx' // 静态资源的地址
```

或者通过 `a` 标签的 `download` 属性

```html
<a href="https://peterroe.icu/download.png" download >点击下载</a>
```

<a href="https://peterroe.icu/download.png" download >点击下载</a>

但是 a + download 的方案[只适用于同源情况](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download)，不能下载外部站点的文件

**独立API**

上面的 读/写 文件的方法，怎么看都不是正规的操作，而是通过一些 hacker 的方式实现的，我们需要一个更加标准的调用

[`showOpenFilePicker`](https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker) 和 [`showSaveFilePicker`](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker) 给了我们这种选择

它通过 API 直接调用文件上传器和下载器。仍然需要手势触发，例如 click 事件

```js
document.querySelector('#pick').onclick = () => {
  showOpenFilePicker()
}

document.querySelector('#download').onclick = () => {
  showSavaFilePicker()
}
```

遗憾的是，兼容性太不好

![img](https://raw.githubusercontent.com/peterroe/static-img/master/202210271316294.png)