---
title: Gzip压缩技术
date: 2021-9-20T16:00:00Z
duration: 3min
description: gzip compress
---

[[toc]]

对于gzip最简洁的定义就是：

>GZIP最早由Jean-loup Gailly和Mark Adler创建，用于UNIX系统的文件压缩

gzip可以指代很多不同的概念，通常指[GNU](https://baike.baidu.com/item/GNU%E8%AE%A1%E5%88%92)计划的实现，也经常用来表示gzip这种文件格式

作为前端工程师，深入UNIX显然不是我们的首要目标，接下来我将会向你展示，为什么要用gzip以及什么时候该用gzip？

## 为什么要使用gzip？

通常，我们部署在一个服务器上的静态文件是这样的结构：

<img src="https://img-blog.csdnimg.cn/f33b2806a44a41889fbc91188a687aea.png"/>

打包后的文件体积会随着工程的代码量增加

例如内部`static/js/`目录下面数个的`chunk`文件，有一个`Chuck`的体积达到了**1M**

<img src="https://img-blog.csdnimg.cn/a43078d92fa74404858acd6f5f65fe0a.png"/>

本地用[nginx](http://nginx.org/en/download.html)代理后，首屏加载耗时在1500ms左右：

<img src="https://img-blog.csdnimg.cn/34f55e22deef4d1db1bd272bd02eb9ec.png"/>

## gzip带来了什么？

开启gzip压缩后，

消耗的时间不到800ms

<img src="https://img-blog.csdnimg.cn/465b46f7bbe140ddbe8422b57b40cacf.png"/>

尽管是本地代理，文件加载的时间也大大缩短了。

是如果用户距离服务器较远，文件加载慢，gzip压缩显然是一个提高速度的好方案

## gzip的本质

gzip也属于压缩技术的一种

压缩，目的是希望被压缩的文件能都已更快的速度传输

只要服务器和浏览器协商好，用同样的压缩解压技术，服务器端压缩后传到浏览器端，浏览器端解压后再使用

gzip就是这样的原理：

```shell
🍕🍔🍟🌭🍿🧀🍗🍖 -----------📦📦📦---------> 🍕🍔🍟🌭🍿🧀🍗🍖
```

## 如何配置gzip

用`gzip`压缩，需要注意的有两点
* 生成`.gz`结尾的压缩包
* `nginx`开启`gzip`压缩

### 生成.gz文件

>如何生成.gz文件与你所使用的技术有关

以Vue2 + webpack举例子

**安装**

```shell
yarn add compression-webpack-plugin --dev   
#or npm
npm install compression-webpack-plugin --save-dev
```

在根目录的`vue.config.js`文件中添加如下插件（没有则新建一个）:

```js title="vue.config.js配置"
const CompressionWebpackPlugin = require('compression-webpack-Plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                test: /\.js|\.css/, // 对匹配的文件类型进行压缩
            })
        ]
    },
}
```

**打包**

根据你的package.json的script字段输入命令进行打包，例如：

```shell
npm run build
```

**打包结果**

webpack会为每一个对于的普通（css、js）文件生成压缩文件：

<img src="https://img-blog.csdnimg.cn/a9cf21658c764d58ae212aedc09527e3.png"/>

注意，不需要删除打包前的js和css文件，为的是当不需要gzip的时候，我们也能顺利加载文件

所以实际上我们的传输过程有两种:

**不用gzip**
```shell
🍕📦🍟📦🌭📦🍿📦 --------------🍕🍟🌭🍿-------------> 🍕🍟🌭🍿 #速度慢
```
**用gzip**
```shell
🍕📦🍟📦🌭📦🍿📦 --------------📦📦📦📦--------->解压-> 🍕🍟🌭🍿 #速度快
```
### nginx部署配置

找到`nginx.conf`中文件部署的位置，添加`gzip on`即可

```py
server {
    listen       82;
    server_name  localhost;
    #开启和关闭gzip模式
    gzip on;
    
    location / {
        root   C:/Users/Admin/Desktop/myproject/dist;
        index  index.html index.htm;
    }
}
```
## nginx压缩

nginx也可以主动进行压缩，但会消耗一定的CPU资源，配置如下
 
```py
server {
    listen       82;
    server_name  localhost;
    #开启和关闭gzip模式
    gzip on;
    #gizp压缩起点，文件大于1k才进行压缩
    gzip_min_length 1k;
        
    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 6;
        
    # 进行压缩的文件类型。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/xml text/javascript application/json image/png image/gif image/jpeg;

    location / {
        root   C:/Users/Admin/Desktop/myproject/dist;
        index  index.html index.htm;
    }
}
```