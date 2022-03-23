<script setup lang="ts">
const tributeNodeRef = ref()

onMounted(() => {
  import('tributejs').then(({ default: Tribute }) => {
    const tribute = new Tribute({
      values: [
        { key: "Phil Heartman", value: "pheartman" },
        { key: "Gordon Ramsey", value: "gramsey" }
      ]
    })
    tribute.attach(tributeNodeRef.value)
  })
})
</script>

<template>
  <div>
    <input
      type="text"
      ref="tributeNodeRef"
      cols="30"
      rows="10"
      class="border resize-none"
    />
  </div>
</template>