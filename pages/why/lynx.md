## lynx

## 诞生原因

* React web、React native 等，视图的更新操作均依赖于 JS执行速度，整体设计偏向应用
* SSR方案，虽然首屏幕较快，但是更新过程仍然受限于JS，且会给服务器带来较大压力

在嵌入式视图场景中，以上两种方案均不能满足。在数据渲染视图的性能、内存上都表现不好

## 优势

* 首屏直出
  * RN，weex是在JS运行时去创建、更新DOM节点，js虚拟机承担了大部分工作，而 Lynx 将 DOM 构建放在 native 层，JS 运行的是业务逻辑
* 原生组件渲染
  * 适用于卡片、嵌入、全页等多种场景

## 应用场景

* 抖音商业化、综搜
* 剪映、轻颜
* 卡片场景，例如 头条UGC

## 组成

* DSL
* 虚拟 DOM与 DIFF算法
* JS Runtime：quickJS，V8，JSC根据场景切换
* Native & Render Kit：贴近 Native view 渲染流程

## VS

* 首屏不依赖 Javascript
* 轻前端，渲染管线减少
* 原生控件高性能渲染
* 数据 Native 层同步，省去夸线程序列化和同步开销
* lepus字节码格式精简，下发速度快
* 资源（内存、线程、GPU）占用更小