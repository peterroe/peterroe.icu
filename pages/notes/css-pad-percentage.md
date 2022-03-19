---
title: padding百分比妙用
date: 2022-03-19
---

众所周知，`padding`属性值如果是以百分号为单位，那么参照的是**自身的宽度**大小

那么，我们可以很容易做出一些效果

## 保持盒子宽高比`2:1`

核心代码

```html
<style>
  .box {
    height: 0;
    padding-botton: 50%
  }
</style>
```

示例：

<div class="
bg-green-500/30 
  h-300px
  mx-auto
  w-50%
  flex
  items-center
">
  <div class="
  bg-blue-400/80
    pb-50%
    h-0
    w-full
  ">
    我的比例永远是2:1
  </div>
</div>

## 正方形

同样的道理，也可以让比例为`1:1`，即产生一个正方形

```diff
<style>
  .box {
    height: 0;
-    padding-botton: 50%
+    padding-botton: 100%
  }
</style>
```

示例：

<div class="
bg-green-500/30 
  h-500px
  mx-auto
  w-50%
  flex
  items-center
">
  <div class="
  bg-blue-400/80
    pb-100%
    h-0
    w-full
  ">
    我的比例永远是1:1
  </div>
</div>