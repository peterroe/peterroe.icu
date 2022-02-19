<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Peter Roe' },
    { property: 'og:image', content: 'https://peterroe.icu/download.png' },
    { name: 'description', content: 'Peter Roe\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@peterroe' },
  ],
})
</script>
