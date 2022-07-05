<script setup lang="ts">
const str = 'my name is peterroe'
const keyWord = 'peterroe'
const handleKeyWordHighlight = (s, k) => { // 希望高亮的文字
  const reg = new RegExp(k, 'g')
  return s.replace(reg, `<span class="highlight">${k}</span>`)
}

const a = ref('abcddbca')
const b = ref('b')

</script>

<template>
  <div>
    <span v-html="handleKeyWordHighlight(str, keyWord)" />
    <hr>
    <div text="center">
      更灵活的效果:
    </div>
    <br>
    <div flex="~" justify="around">
      <div>
        str:<input
          v-model="a"
          ml="5"
          rounded
          border="~"
          p="2"
          placeholder="str"
        >
      </div>
      <div>
        keyword:<input
          v-model="b"
          ml="5"
          rounded
          border="~"
          p="2"
          placeholder="keyword"
        >
      </div>
    </div>
    <br>
    <span v-html="handleKeyWordHighlight(a, b)" />
    <br>
  </div>
</template>

<style>
  .highlight {
    background-color: yellow;
  }
</style>
