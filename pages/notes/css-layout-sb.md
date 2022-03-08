---
title: 圣杯/双飞翼布局
date: 2022-03-08
---

圣杯布局代码：

```html
<style>
  #layout-sb {
    padding: 0 100px;
  }
  
  .center {
    width: 100%;
  }
  
  .left {
    width: 100px;
    margin-left: -100%;
    position: relative;
    left: -100px;
  }
  
  .right {
    width: 100px;
    margin-left: -100px;
    position: relative;
    left: 100px;
  }
  
  .center,
  .left,
  .right {
    float: left;
  }
</style>

<div id="layout-sb">
  <div class="center">center</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

双飞翼布局代码：

```html
<style>
  #app {
    overflow: hidden;
  }
  
  .left {
    margin-left: -100%;
    width: 200px;
  }
  
  .center {
    width: 100%;
  }
  
  .content {
    margin: 0 200px;
  }
  
  .right {
    width: 200px;
    margin-left: -200px;
  }
  
  .left,
  .right,
  .center {
    float: left;
  }
</style>

<div id="app">
  <div class="center">
    <div class="content">
      center
    </div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

实现的效果都是相同的：

<layoutSb />