---
title: JS编程风格指南
---

### 函数的退出时机

由于某些条件，函数提前退出，这种情况下，函数的退出时机应该尽量靠前。

好的示例：

```js
function foo() {
  if (condition) {
    return;
  }
  // do something
  // do something
  // do something
  // do something
}
```

尤其是当主要逻辑代码多，且又写在条件块里面，这种情况尤为明显。我们显然可以提前退出，这样可以减少代码的嵌套层级，提高代码的可读性。

坏的示例：

```js
function foo() {
  if (!condition) {
    // do something
    // do something
    // do something
    // do something
  }
}
```

这种好处还体现在有多个逻辑分支决定是否退出的时候

好的示例：

```js
function foo() {
  if (condition1) {
    return;
  }
  // do something
  if (condition2) {
    return;
  }
  // do something
  if (condition3) {
    return;
  }
  // do something
```

:::tip
尽量让主要的逻辑写在外层
:::


