<script setup lang="ts">
interface titleType {
  title: string
  icon: string
}

const props = defineProps({
  currentTitle: {
    type: String,
    default: 'notes',
    validitor(value: string) {
      return ['notes', 'javascript', 'typescript', 'vue', 'algorithm', 'net', 'other'].includes(value)
    },
  },
})

const list = ref<titleType[]>([
  {
    title: 'notes',
    icon: 'i-mdi-language-css3',
  },
  {
    title: 'javascript',
    icon: 'i-raphael-js',
  },
  {
    title: 'typescript',
    icon: 'i-teenyicons-typescript-outline',
  },
  {
    title: 'vue',
    icon: 'i-mdi-vuejs',
  },
  {
    title: 'project',
    icon: 'i-mdi-tools',
  },
  {
    title: 'algorithm',
    icon: 'i-simple-icons-thealgorithms',
  },
  {
    title: 'rust',
    icon: 'i-mdi-language-rust',
  },
  {
    title: 'net',
    icon: 'i-zondicons-network',
  },
  {
    title: 'other',
    icon: 'i-icon-park-outline-application-one',
  },
])
</script>

<template>
  <div class="opacity-20 italic">Quick notes / tips - {{ currentTitle }}</div>
  <h1 class="mb-0 flex justify-between">
  <template v-for="item in list" :key="item.title">
    <router-link
      v-if="currentTitle != item.title"
      class="opacity-20 hover:opacity-50 !border-none !font-400"
      :to="item.title"
    >
      <i :class="item.icon"></i>
    </router-link>
    <i v-else :class="item.icon"></i>
  </template>
</h1>
</template>
