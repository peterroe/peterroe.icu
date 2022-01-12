<script setup lang="ts">
import { ref } from 'vue'

const data = ref(['none', 'contain', 'cover', 'fill'])
const index = ref(0)
</script>

<template>
  <div>
    <div flex justify-around>
      <button active:bg-red px-10 my-6 border rounded-2xl @click="index = 0">none</button>
      <button active:bg-red px-10 my-6 border rounded-2xl @click="index = 1">contain</button>
      <button active:bg-red px-10 my-6 border rounded-2xl @click="index = 2">cover</button>
      <button active:bg-red px-10 my-6 border rounded-2xl round @click="index = 3">fill</button>
    </div>
    <div>
      <img border h-250px w-250px m-auto :style="{'object-fit': data[index]}" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" alt="">
    </div>
  </div>
</template>
