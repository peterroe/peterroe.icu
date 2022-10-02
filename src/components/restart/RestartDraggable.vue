<script setup>
function allowDrop(ev) {
  ev.preventDefault()
}

function drag(ev) {
  ev.dataTransfer.setData('Text', ev.target.id)
}

function drop(ev) {
  const data = ev.dataTransfer.getData('Text')
  ev.target.appendChild(document.getElementById(data))
  ev.preventDefault()
}
</script>

<template>
  <div id="div1" @dragover="allowDrop" @drop="drop" />
  <br>
  <p id="drag1" draggable="true" @dragstart="drag">
    这是一段可移动的段落。请把该段落拖入上面的矩形。
  </p>
</template>

<style scoped>
  #div1 {height:70px;padding:10px;border:1px solid #aaaaaa;}
  p {
    margin: 0;
  }
</style>
