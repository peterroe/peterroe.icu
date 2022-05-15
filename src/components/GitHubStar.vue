<script setup lang="ts">
defineProps<{ repo: string }>()
</script>

<template>
  <img :src="`https://badgen.net/github/stars/${repo}?icon=github&color=4ab8a1`" />
</template>
