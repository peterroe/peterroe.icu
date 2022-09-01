---
title: 元素水平垂直居中的几种方式
date: 2022-09-01
duration: 4min
---

[[toc]]

给定一个默认的 `css` 样式，下面的示例都基于此扩展：

```html
<style>
.father {
  height: 200px;
  width: 300px;
  background: #e77975;
}

.son {
  width: 50px;
  height: 50px;
  background: #77da89;
}
</style>
<div class="father">
  <div class="son">hello</div>
</div>
```

默认效果：

<DefaultStyle />

---

目的效果：

<InlineBlockCenter />

---

## 子绝父相V1

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}
```
## 子绝父相V2

> 需要子元素定宽定高

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

## 子绝父相V3

> 需要知道子元素的宽高

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
}
```

## 子绝父相V4

> 需要知道子元素的宽高

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -25px;
  margin-left: -25px;
}
```

## flex布局V1

```css
.father {
  display: flex;  /* 换成grid也可 */  
  justify-content: center;
  align-items: center;
}
```

## flex布局V2

```css
.father {
  display: flex; /* 换成grid也可 */
}
.son {
  margin: auto;
}
```

## 伪元素V1

> 骚操作，比较复杂

```css
.father {
  text-align: center; 
}

.son {
  display: inline-block; 
  vertical-align: middle; 
}

.father::before { 
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
```

## 伪元素V2

> 需要知道子元素的高度

```css
.father {
  text-align: center; 
}

.son {
  display: inline-block; 
  vertical-align: middle; 
}

.father::before { 
  content: '';
  line-height: 200px;
  vertical-align: middle;
}
```

## table-cell

> 比较古老的方式

```css
.father {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.son {
  display: inline-block;
}
```
