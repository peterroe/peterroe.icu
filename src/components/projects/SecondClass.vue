<script setup lang="ts">
import { ref } from 'vue'

const imgs = ref([
  'https://img-blog.csdnimg.cn/822e5932db944ae2b4159783d5d1fb9c.png',
  'https://img-blog.csdnimg.cn/317732a51200454093d429ef058c64de.png',
  'https://img-blog.csdnimg.cn/d54fd5a161bc42da81e4850c352b77dd.png'
])
</script>
<template>
  <div class="p-0 rounded-4xl">
    <img class="border shadow-md" src="https://img-blog.csdnimg.cn/4bb7058dbca54521838b48c595ee6e34.png" alt="">
    <div text-base my-auto flex justify-center><div i-carbon-arrow-down my-auto mr-1 /> Hover over it</div>
    <div class="grid gap-6 grid-cols-3" @click="imgClick">
      <img
        v-for="item in imgs"
        class="border shadow-md transform transition duration-500 hover:scale-125 hover:z-10"
        :src="item"
        :key="item"
      />
    </div>
  </div>
</template>
