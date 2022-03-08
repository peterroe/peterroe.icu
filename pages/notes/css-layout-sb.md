---
title: 圣杯布局
date: 2022-03-08
---

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

效果：

<layoutSb />