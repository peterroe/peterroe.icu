---
title: 浏览器缓存与静态资源部署建议
date: 2022-01-17
duration: 3min
---

[[toc]]

## 缓存的好处

* 缓解服务器压力
* 提高用户获取资源速度
* 减少带宽消耗

*浏览器缓存流程：*

<img border src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca00bff3081e4cfd993a8f252f4fa23a~tplv-k3u1fbpfcp-watermark.awebp"/>

## 强缓存


强缓存主要由两个字段控制

**Expires**

服务器设置的资源可用时间，采用格林尼治时间，在此时间之前资源都是可用的。但是由于是绝对时间，需要和本地时间结合判断是否过期，因此可能会不准确

```shell
expires: Tue, 17 Jan 2023 07:25:49 GMT
```

**Cache-Control**

当`Expires`和`Cache-Control`都存在时，后者优先级更高，`Cache-Control`通过`max-age`设定相对过期时间，解决了`Expires`的问题

主要取值

* public: 资源客户端和浏览器端都可以缓存
* private: 只有浏览器可用缓存
* no-cache: 浏览器可用缓存，但是需要协商缓存
* no-store: 不缓存
* max-age: 保质期

## 协商缓存

协商缓存使用两个请求头，协商成功返回`304`

**If-Node-Match**

服务器返回的资源中会有`Etag`响应头，而`If-None-Match`将携带它的值重新向服务器发送请求，如果没有匹配到此`Etag`值，服务器将响应

**If-Modified-Since**

同理，它通过携带`Last-Modified`的值，发送服务器，如果携带的时间和服务器最后修改的时间不匹配，则响应请求

> Etag和Last-Modified
>
> Last-Modified是资源最后的修改时间，单位是秒（s）级别的，而Etag是为当前资源生成的唯一值，可信度更高，对频繁修改的资源来说，能更好地检测是否有修改，所以Etag的优先值也更高

## 缓存位置

按查找优先级，主要有两种

* Memory Cache
* Dist Cache

**Memory Cache**

内存缓存

**Disk Cache**

硬盘缓存

## 缓存方案

* HTML使用协商缓存
* Js、Css、Image使用强缓存，带上hash值

## name-hash和query-hash

hash值我们一般通过消息摘要算法生成，在选择hash时候，我们有这两种选择

```html
<!-- name-hash -->
<link href="foo.s5dfgwh.css" />
<link href="bar.css438f.css" />

<!-- query-hash -->
<link href="foo.css?q=sdfgfg" />
<link href="bar.css?q=df67sf" />
```

上述两种方案`name-hash`方式是更好的，当我们**覆盖式发布**新的html和css、js资源的时候，HTML资源和静态资源的先后部署顺序会影响用户的体验


1. 先部署静态资源，部署期间访问时，会出现V1版本HTML访问到V2版本新静态资源，并按V1-hash缓存起来。
2. 先部署HTML，部署期间访问时，会出现V2版本HTML访问到V1版本旧静态资源，并按V2-hash缓存起来。

>如下图所示，展示了不同版本HTML与不同版本静态资源互相匹配到出现的异常Case。

<img border src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afed5037b76e48caac538b05d4db79b7~tplv-k3u1fbpfcp-watermark.awebp?" />

解决方案就是采用`name-hash`的方式，先上线静态资源，再上线HTML

当用户获取老v1版本HTML时候，匹配的也是老v1的静态资源，v2同理，成功的解决了这个问题