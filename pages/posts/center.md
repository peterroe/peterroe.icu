---
title: 元素水平垂直居中的几种方式
date: 2022-09-01
duration: 4min
---

### inline-block

```html
<style>
.father {
  height: 200px;
  width: 300px;
  background: #e77975;
  text-align: center;     /*必要*/
}

.son {
  width: 50px;
  height: 50px;
  background: #77da89;
  display: inline-block;  /*必要*/
  vertical-align: middle; /*必要*/
}

.father::before {         /*必要*/
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
<div class="father">
  <div class="son">hello</div>
<div>
```

<InlineBlockCenter />