<script setup>
import { UButton, UInput, message } from 'ungeui'

const str = ref('')
const after = ref('')

watch([str], () => {
  const kvs = str.value.split('\n')
  const arr = kvs.map(item => item.split(':').map(it => it.replace(/,/g, '').trim()))
  console.log(arr)
  after.value = arr.filter(it => it.length === 2).map((item) => {
    return `${item[0]}=${item[1]}&`
  }).join('').slice(0, -1)
})

const getParams = async() => {
  await navigator.clipboard.writeText(after.value)
  message.success('复制成功')
}

</script>

<template>
  <div>
    <u-input v-model:value="str" type="textarea" />
    <!-- {{ after }} -->
    <div flex items="center" gap="4" mt-5 justify="between">
      <u-input size="large" flex="1" :value="after" />
      <u-button @click="getParams">
        复制
      </u-button>
    </div>
  </div>
</template>
