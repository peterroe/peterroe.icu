<script setup>
const range = ref()
const angle = ref()
onMounted(() => {
  console.dir(range.value)
})

const rangeChange = () => {
  angle.value = range.value.value / 100 * 180
}

const style = computed(() => {
  return {
    transform: `rotateY(${angle.value}deg)`,
  }
})
</script>

<template>
  <div text-center>
    <div>
      rotateY：<input ref="range" type="range" m-auto value="0" @input="rangeChange">
    </div>
    <p>普通：</p>
    <div bg-blue class="w-4\/5" m-auto :style="style" mb-2>
      hello world
    </div>
    <p>添加了<code>backface-visibility: hidden</code>：</p>
    <div bg-blue class="w-4\/5 hidden-back" m-auto :style="style">
      hello world
    </div>
  </div>
</template>

<style>
.hidden-back {
  backface-visibility: hidden;
}
</style>
