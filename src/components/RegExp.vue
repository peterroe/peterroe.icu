<script setup lang="ts">
const v = ref('aSc')
const r = ref('/^a[A-Z]c$/')
const result = computed(() => {
  return /^a[A-Z]c$/.test(v.value)
})
</script>

<template>
  <div flex gap-5 justify-around mb-3>
    <div>RegExp:</div>
    <div>Target:</div>
    <div>isMatch？</div>
  </div>
  <div flex justify-between>
    <input v-model="r" border p-2 rounded-md>
    <input v-model="v" border p-2 rounded-md>
    <input :value="result" disabled border p-2 rounded-md>
  </div>
</template>
