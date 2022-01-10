<script setup lang="ts">
import { ref } from 'vue'

const imgs = ref([
  'https://hnust-ticknet-swzl.oss-cn-hangzhou.aliyuncs.com/secondClass/2022/01/10/64f82506-a3d8-456d-99ff-945b7f6b5c59.png',
  'https://hnust-ticknet-swzl.oss-cn-hangzhou.aliyuncs.com/secondClass/2022/01/10/ad52c886-3930-4cc0-8d51-c9645a145233.png',
  'https://hnust-ticknet-swzl.oss-cn-hangzhou.aliyuncs.com/secondClass/2022/01/10/e00658c6-e1a9-4c0f-85d4-3343a7ada6d3.png'
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
