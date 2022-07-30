<script setup lang="ts">
import { UWaterfall } from 'uwaterfall'
defineProps({
  lists: Array,
})
</script>

<template>
  <div class="life">
    <UWaterfall :column-count="4" column-gap="10px">
      <template v-for="it in lists.reverse()" :key="it.title">
        <div class="item" border border-gray rounded-xl>
          <img v-lazy="it.img">
          <div p-3 class="word">
            {{ it.title }}
            <br>
            <br>
            <span opacity-80 italic>
              <!-- {{ it.date }} -->
            </span>
          </div>
        </div>
      </template>
    </UWaterfall>
  </div>
</template>

<style>
.life img {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>

<style scoped>
.item {
  break-inside: avoid;
  word-break: break-all;
  text-align: justify;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
