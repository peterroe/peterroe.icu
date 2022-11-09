<template>
  <div id="meImg" mb-15>
    <Atropos class="my-atropos">
      <!-- <div class="a"> -->
      <slot />
      <!-- </div> -->
      <div mt-3 flex justify="between" item-center>
        <div>{{ msg }}</div>
        <slot name="icon" />
      </div>
    </Atropos>
  </div>
</template>

<script setup lang="ts">
// import Atropos component
import Atropos from 'atropos/vue'

const props = defineProps<{src: string; msg: string}>()
// const src = ref(props.src)
</script>

<style scoped>
img {
  /* transform: scale(1.9) */
  border-radius: 10px;
}
</style>
