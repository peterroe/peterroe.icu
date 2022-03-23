---
title: tributejs实现@功能
date: 2022-03-19
type: javascript
---

在下面输入`@`

<TributeDemo />

示例代码：

```html
<script setup lang="ts">
import Tribute from "tributejs";
import 'Tributejs/dist/tribute.css'

let tribute = new Tribute({
  values: [
    { key: "Phil Heartman", value: "pheartman" },
    { key: "Gordon Ramsey", value: "gramsey" }
  ]
});

onMounted(() => {
  tribute.attach(document.querySelector("#tributeNode"));
})
</script>

<template>
  <div>
    <input
      type="text"
      id="tributeNode"
      class="border resize-none"
    />
  </div>
</template>
```

More: <GitHubLink repo="zurb/tribute"/>