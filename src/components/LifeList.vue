<script setup lang="ts">
import { UWaterfall } from 'uwaterfall'
defineProps({
  lists: Array,
})
</script>

<template>
  <div class="life">
    <UWaterfall :columnCount="4">
      <template v-for="it in lists" :key="it.title">
      <div class="item" border border-gray rounded-xl >
        <img :src="it.img"/>
        <div p-3 class="word">
          {{ it.title }}
          <br>
          <br>
          {{ it.date }}
        </div>
      </div>
      </template>
    </UWaterfall>
  </div>
</template>

<style>
.life img {
  margin-top: 0;
  margin-bottom: 0;
}
</style>

<style scoped>
.item {
  break-inside: avoid;
  text-align: justify;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
