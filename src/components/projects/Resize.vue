<template>
  <div>
    width: {{content?.contentRect?.width}}
    height: {{content?.contentRect?.height}}
  </div>
  <div border h-400px>
    <textarea ref="textareaRef" border class="resize-both" cols="30" rows="10">Resize me!</textarea>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const textareaRef = ref()
const content = ref({})
onMounted(() => {
  const io = new ResizeObserver((entries) => {
    content.value = entries[0]
    console.log('%c [ entries ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', entries)
  })
  io.observe(textareaRef.value)
})
</script>

<style>
.resize-both {
  resize: both;
}
</style>
