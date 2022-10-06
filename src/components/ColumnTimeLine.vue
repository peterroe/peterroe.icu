<script setup>
const list = [
  {
    link: '/algorithm',
    name: '算法之路',
  },
  {
    link: '/restart',
    name: '重学前端',
  },
  {
    link: '/soft-skill',
    name: '软技能',
  }, {
    link: '/source-code',
    name: '源码解析',
  }, {
    link: '/js-style-guide',
    name: 'JS编程风格指南',
  },
]

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
    <div v-for="(it, i) in list" :key="it.name" pt="1px">
      <div flex text-lg>
        <div
          w-4
          h-4
          rounded-full
          border="4px solid red"
          :style="`border-color: ${randomHexColor()}`"
          my-2
          mr-4
        />
        <a :href="it.link">{{ it.name }}</a>
      </div>
      <div v-if="i !== list.length-1" ml="7px" h-6 w="2px" bg-gray />
    </div>
  </div>
</template>
