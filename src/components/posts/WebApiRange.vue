<template>
  <div id="word">my name is peterroe</div>
</template>

<script setup lang="ts">
  const keyWord = 'name'
  const reg = new RegExp(keyWord)
  onMounted(() => {
    const textNode = document.querySelector('#word')?.childNodes[0]
    if(!textNode) return 

    const content = textNode?.textContent || ''

    const start = content.match(reg)?.index || 0
    const end = start + keyWord.length
    
    const range = document.createRange()
    range.setStart(textNode, start)
    range.setEnd(textNode, end)

    const highElm = document.createElement('span')
    highElm.setAttribute('class', 'high-light')
    range.surroundContents(highElm)
  })
</script>

<style>
.high-light {
  background-color: yellow;
}
</style>