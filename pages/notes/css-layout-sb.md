---
title: 圣杯布局
date: 2022-03-08
---

```html
<style>
  #app {
    padding: 0 100px;
  }
  
  .center {
    width: 100%;
    background-color: red;
  }
  
  .left {
    width: 100px;
    margin-left: -100%;
    background-color: skyblue;
    position: relative;
    left: -100px;
  }
  
  .right {
    width: 100px;
    background-color: aquamarine;
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

<div id="app">
  <div class="center">left</div>
  <div class="left">center</div>
  <div class="right">right</div>
</div>
```