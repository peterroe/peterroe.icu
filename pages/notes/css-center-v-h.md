---
title: 水平垂直居中的四种方式
date: 2022-01-16
---

## 定位方式

```css
.parent {
  position: relative
}

.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

## Flex

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Grid

```css
.parent {
  display: grid;
  place-items: center;
}
```


## Table

```css
.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

<div flex justify-center mt-30px>
  <div style="display: table-cell; text-align: center;vertical-align: middle;" border>
  <img ml-2em mr-2em src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8309a01f90e404b8bc1f86d4a6a7623~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?"/>
</div>
</div>