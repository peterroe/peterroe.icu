---
title: CDN缓存原理
date: 2022-01-17
type: net
---

`CDN`意为内容分发网络，用于根据用户位置，最快速度分发静态资源

## CDN流程

<img border src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcd8f20339064af1a4e3e4847e0a3d6a~tplv-k3u1fbpfcp-watermark.awebp" />

如上图所示，最后一个**DNS解析**的步骤，是经过了CDN服务商的调度系统，会根据用户IP判断最近的CDN节点，然后返回该节点的IP地址给用户

传统的DNS解析返回的是域名对应的主机IP，