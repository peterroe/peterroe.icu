---
title: NodeJs
---

### BFF

BFF 指的是 Backend for FrontEnd（前端架构的后端），指的是介于前端应用和底层服务之间的一个层，面向前端提供服务

作用：
  
承接接口代理、聚合以及 DB 无关的部分业务逻辑

何时使用？

* 需要大量时间开发且是难以维护的系统，可以使用
* 如果跨不同前端应用程序接口（移动和 Web 浏览器等）的功能需求显着不同，则为每个前端框架提供专用的 BFF 服务将大大降低维护复杂性
* 需要为特定的前端开发优化的后端，BFF 是一个合适的选择

### Serverless Functions

> https://blog.hubspot.com/website/serverless-functions

优点：

每个函数单一部署，修改部分功能不用部署整个代码库

![img](https://blog.hubspot.com/hs-fs/hubfs/c0059e19-94dd-4cf7-b91e-ead717464d18.png?width=1300&name=c0059e19-94dd-4cf7-b91e-ead717464d18.png)

常见厂商：

* aws(Amazon Web Services) Lambda
* Google Cloud Functions
* MicroSoft Azure Functions
* IBM Cloud Functions
* Alibaba Cloud Function Compute

什么时候该用：

* 减少费用，按流量计费
* 无需维护服务器软硬件
* 应用随时可扩展