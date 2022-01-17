---
title: 常见http首部字段
date: 2022-01-16
type: net
---

[[toc]]

<div italic opacity-50>通用首部字段</div>

## Cache-Control

`Cache-Control`用于控制缓存

```shell
Cache-Control: private, max-age=0, no-cache
```

分类
  * `public`，服务端和客户端都可以缓存
  * `private`，表示只客户端可以缓存
  * `no-cache`，防止缓存中返回过期的资源，返回前需要向服务器确认有效性（协商缓存）
  * `no-store`，不缓存
  * `max-age`，缓存时间，该时间内不必向服务器请求

## Connection

* 管理持久连接
  * `Connection: Keep-Alive`，代表长连接
  * `Connection: Close`，关闭长连接

## Date

HTTP连接创建的时间，标准格式：

```shell
Date: Tue 03 Jul 2012 04:40:23 GTM
```

***

<div italic opacity-50>请求首部字段</div>

## Accept

告诉服务器用户代理能够处理的媒体类型及相对优先级

```shell
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

## Accpet-Encoding

告诉服务器用户代理支持的内容编码

```shell
Accept-Encoding: gzip, deflate, br
```

## Acceept-Language

告诉服务器用户代理能够处理的语言集

```shell
Accept-Language: zh-CN,zh;q=0.9,et;q=0.8
```

## Authorization

告诉服务器的认证信息，通常用来发送`Cookie`

## Host

请求资源所处的主机名和端口号

```shell
Host: localhost: 4000
```

## Referer

完整资源地址

```shell
Referer: http://localhost:4000/talks
```

## If-XXX

表示服务器判定请求为真时，才会执行请求

* If-Match
* If-None-Match
* If-Modified-Since

## User-Agent

用户代理，代表浏览器的种类

***

<div italic opacity-50>响应首部字段</div>

## ETag

将每次返回的资源做唯一标识

```shell
ETag: "qeaB8+fm6dzpqkxSYWySKDqtc/I="
```

## Location

配合重定向使用，指明重定向的地址

```shell
location: http://www.baidu.com
```

***

<div italic opacity-50>实体首部字段</div>

## Content-Encoding

告诉浏览器实体主体的编码格式

```shell
Content-Encoding: gzip,br,deflate
```

## Content-Language

告诉浏览器实体资源使用的语言

## Content-Length

表示实体主体部分的大小，单位是字节

## Content-Type

说明实体主体媒体类型

```shell
Content-Type: text/html; charset=UTF-8
```

## Expires

告知浏览器资源失效日期

```shell
Expires: Wed, 04 Jul 2012 08:26:05 GMT
```

## Last-Modified

告诉浏览器资源的最后修改时间