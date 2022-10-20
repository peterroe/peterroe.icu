---
title: JS Programming Style Guide
subtitle: JS编程风格指南
---

[[toc]]

### 函数的退出时机


```js
//no recommend
function foo() {
  if (/*!condition*/) {
    // do something
  }
}

// recommend
function foo() {
  if (/*condition*/) {
    return;
  }
  // do something
}
```

### 避免在 for 循环里面改变 i

```js
// no recommend
for(let i = 0; i < arr.length; i++) {
  if(/*xxx*/) {
    i += 3
  }
}

// recommend
let i = 0
while(i < arr.length) {
  if(/*xxx*/) {
    i += 3
  }
  i++
}
```

### 默认值

```js
// no recommend
function applyExtractors(otherSet) {
  let set = otherSet || new Set()
  set.add(2)
  return set
}

// recommend
function applyExtractors(set = new Set()) {
  set.add(2)
  return set
}
```

`