---
title: split技巧
date: 2022-06-22
duration: 2min
---

## 高亮的实现

我们知道，以`Vue`为例子，如果想要实现文字高亮效果，需要借助`v-html`进行模版渲染，例如：

在下面的代码中

```html
<script setup>
  const handleKeyWordHighlight = (before, keyWord) => {
    const before = 'aabbccbb'  //原始字符串
    const keyWord = 'bb'       //希望高亮的文字
    const after = before
  }
</script>
<div>
  <span v-ht>{{}}</span>
<div>
```