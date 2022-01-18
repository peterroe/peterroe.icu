<template>
  <div>isIntersecting: {{ isVisabled.toString() }}</div>
  <div ref="containerRef" id="contain" class="scroll-contain" h-200px border overflow-auto>
    <div class="grid-center" h-600px>
      <div ref="boxRef" id="box" p-40px border bg-blue>box</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const containerRef = ref()
const boxRef = ref()
const isVisabled = ref(false)
onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    isVisabled.value = entries[0].isIntersecting
    
    // console.log('%c [ isVisabled.value ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', isVisabled.value)
    console.log('%c [ entries ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', entries)
  }, {
    root: containerRef.value,
  })
  io.observe(boxRef.value)
})
</script>

<style>
.grid-center {
  display: grid;
  place-items: center;
}
.scroll-contain {
  overscroll-behavior: contain;
}
</style>
