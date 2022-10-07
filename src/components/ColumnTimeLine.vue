<script setup lang="ts">
interface TimeLineItem {
  name: string
  link: string
  icon: string
}
defineProps({
  lists: Array,
})

const randomHexColor = function() {
  let hex = Math.floor(Math.random() * 16777216).toString(16) // 生成ffffff以内16进制数
  while (hex.length < 6) { // while循环判断hex位数，少于6位前面加0凑够6位
    hex = `0${hex}`
  }
  return `#${hex}` // 返回‘#’开头16进制颜色
}

</script>

<template>
  <div>
    <div v-for="(it, i) in lists" :key="it.name" pt="1px">
      <div flex text-lg items-center>
        <div
          w-4
          h-4
          rounded-full
          border="4px solid red"
          :style="`border-color: ${randomHexColor()}`"
          my-2
          mr-4
        />
        <i :class="it.icon" mr-2 text-6 />
        <a :href="it.link">{{ it.name }}</a>
      </div>
      <div v-if="i !== lists.length-1" ml="7px" h-6 w="2px" bg-gray />
    </div>
  </div>
</template>
