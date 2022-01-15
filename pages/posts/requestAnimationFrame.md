---
title: 浅谈requestAnimationFrame
date: 2021-12-11
duration: 10min
---

[[toc]]

在性能优化上，最近研究了一下这个接口

[MDN是这么描述的:](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

>window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

说实话，上面描述的不是很清除，对初学者来说，容易混淆

接下来我一步一步拆解，带你理解这个接口的作用

**我们先来看看什么是重绘**

## 重绘（Repaint）

在浏览器中，重绘指的是改变样式不影响它在文档流中的位置，例如：

```html
<span id="app">
    Hello
</span>
<span>
    World
</span>
<script>
    let app = document.querySelector('#app')
    app.style.backgroundColor = "#ddd"
    app.style.color = "blue"
</script>
```
显然，因为我上面的操作不会改变`span`的在文档中的位置

所以浏览器仅仅需要**重绘**第一个`span`所在位置的像素，完全不影响其他地方


![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf51cf1c5feb4fd384cf8539d8991ca9~tplv-k3u1fbpfcp-zoom-1.image)

**因为不影响其他元素的布局，所以不需要重绘它们**


## 重排（ReFlow）

重排也叫做回流，重排意味着，因为某个元素的布局改变，导致其他元素的位置改变，所以其他元素也要重新绘制

还是如上的例子，当我尝试改变内边距：
```js
app.style.padding = "10px"
```

显然第二个盒子被往右推了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b5b23580a44b248d52cdf6300e79ea~tplv-k3u1fbpfcp-zoom-1.image)

上面是最简单的例子，虽然看起来并无影响

但我们可以试想，如果应该一个元素的小小变化，而引起整个页面重排，性能消耗是极大的

>上面的例子还可以看出，重排肯定要重绘，但是重绘不一定要重排


## 动画的痛点？

`Css`的动画与过渡在页面中经常使用，也常常伴随着大量的重绘与重排

我们知道，动画的标准频率是`60hz`，这意味着，要想做出流畅的动画，需要每16.6ms渲染一帧，也就是在1000ms内渲染60次

虽然渲染过程是由浏览器完成的，但是我们可以通过编码，让元素属性在合适的时间内改变，从而让浏览器在16.6ms内完成单次渲染

**动画为什么会卡？**

理想总是很丰满，但现实很残酷。

我们知道，在同一个渲染进程中，存在`JS线程`和`GUI线程`，JS线程负责执行JS代码，GUI线程负责渲染页面（这里是渲染而不是绘制，绘制由浏览器进程完成）。

因为`JS`是可以操作`DOM`的，如果`JS`线程和`GUI`线程同时执行，那么渲染线程前后获得的元素可能就不一致了

所以`JS`执行和页面渲染是互斥的，如果`JS`执行时间过长，就会导致页面动画卡顿。

>试想一下，假如我用js改变某一个DOM元素的高度，我希望每100ms增加1px

```js title="例子"
let count = 100
setInterval(() => {
    app.style.height = (count++) + 'px'
},100)

```

有两个问题产生：

1. `JS`有可能长时间占据主线程（还有其它事要做），假设`JS`一直占据`500ms`，那么就意味着`JS`操作元素增加`10px`才渲染新的一帧，那么页面动画看起来就卡卡的，感觉元素在瞬间移动，而不是慢慢过渡
2. 定时器不准确，导致`JS`没有在合适的时间内改变元素属性

第一个问题可以通过`Web Workers`解决，把无关`Dom`操作的耗时操作放到`Web Workers`中

第二个问题，就可以通过`requestAnimationFrame`解决

**requestAnimationRrame比定时器精确？**

并不是，解决第二个问题通过提高精度是不靠谱的，最好的方法就是在浏览器重新绘制新的一帧之前，执行一些必要的操作，比如这个函数

我们向`requestAnimationRrame`传入回调函数，这样浏览器，每次绘制之前必然会执行我们js改变元素的代码，动画也就流畅了

>当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数

```js
requestAnimationFrame((temp) => {
  console.log(temp) //temp是从第一次执行开始的时间戳
})
```
但是`requestAnimationFrame`只会执行一次，我们需要递归调用

```js
let ref = requestAnimationFrame(test)

function test(temp) {
    console.log(temp)
    ref = requestAnimationFrame(test)
}
```

你可能还是很迷惑执行的过程，上面不是递归吗？没有出口的话，浏览器不是会一下子卡死吗？

但结果却不是这样：
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f95e2fa33f04bbba2987bb4483cea2b~tplv-k3u1fbpfcp-zoom-1.image)

只要记住：`requestAnimationFrame()`里面的回调函数不是立即执行，而是绘制的前一时刻由浏览器调用执行，因为实际上`requestAnimationFrame`是一个宏任务。此外次API专属于浏览器，不能在NodeJs环境运行（Node没有GUI，也就不会有此API）。

和定时器一样，因为调用完了就销毁，所以只调用一次`requestAnimationFrame`就只执行一次

**所以该函数一般来说最多每秒执行60次（如果屏幕刷新率是60HZ）**

利用`requestAnimationFrame`思路：

```js
let startTime = 0
let count = 100
let ref = requestAnimationFrame(test)
function test(temp) {
    if(temp - startTime > 100) {
        app.style.height = (count++) + 'px'
        time = startTime
    }
    ref = requestAnimationFrame(test)
}
```

## temp和ref

**temp**

回调函数内可以接收参数，也就是我上文称为的`temp`，一旦执行，它从`0ms`开始增加计时

且多个`requestAnimationFrame`的`temp`值的一样的，例如：

```js
requestAnimationFrame(one)
function one(temp) {
    console.log(temp,'one')
    requestAnimationFrame(one)
}

setTimeout(() => {
  requestAnimationFrame(two)
  function two(temp) {
      console.log(temp,'two')
      e = requestAnimationFrame(two)
  }
},4000)
```
就算用定时器延迟执行，`temp`值依然是一样的：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3200fd609f741e39ea82b9e6c5203da~tplv-k3u1fbpfcp-zoom-1.image)

**ref**

`requestAnimationFrame()`的返回值（上文我称为`ref`），也是有作用的，代表`requestAnimationFrame`回调执行的次数：

```js
let ref = requestAnimationFrame(one)
function one() { 
    console.log(ref)
    ref = requestAnimationFrame(one)
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caa13b134e4e421893093c24dce191fe~tplv-k3u1fbpfcp-zoom-1.image)

## 停止执行

你可能注意到，上面所有关于`requestAnimationFrame`的写法都是没有出口的，意味着会一直执行

我们可以`cancelAnimationFrame()`取消回调函数

```js
const beginBtn = document.querySelector("#begin")
const endBtn = document.querySelector("#end")
const app = document.querySelector("#app")

let ref
beginBtn.onclick = () => {
    ref = requestAnimationFrame(one)
}
endBtn.onclick = () => {
    cancelAnimationFrame(ref)
}

let startTime = 0
function one(temp) {
    if(temp - startTime > 100) {
        app.style.height = (count++) + 'px'
        time = startTime
    }
    ref = requestAnimationFrame(one)
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f4eb93518474f54af6c749b752ec0cf~tplv-k3u1fbpfcp-zoom-1.image)

## setInterval和setTimout

`setInterval`和`setTimout`不够精确的原因是内在机制决定。当计时结束不意味着回调函数会立即执行

而是将回调函数放到回调队列末尾，导致实际执行时间总是大于预定的时间，例如下面简单的测试：

```js
console.time()
setTimeout(() => {
    console.timeEnd()
},1000)
```
测试两次：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e66c0296a935499889125c83d0640f20~tplv-k3u1fbpfcp-zoom-1.image)

结果都将大于`1000ms`，而且时间不固定（注：3036和3048是定时器的返回值）

`requestAnimationFrame` 采用 浏览器时间间隔 ，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，消耗性能；也不会因为间隔时间太长，使用动画卡顿不流畅


## 其他

MDN范例：

```js
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
        
    const elapsed = timestamp - start;

    //这里使用`Math.min()`确保元素刚好停在200px的位置。
    element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

    if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);
```

上面的例子说明，如果想在回调里面控制执行时刻，推荐使用回调参数`timestamp`作为时间的参考

此外，也可以结合`new Date()`来控制时间

兼容性：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6ebf8760d8a4fc2b9a3aea252626147~tplv-k3u1fbpfcp-zoom-1.image)
