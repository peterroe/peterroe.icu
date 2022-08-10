<script setup>
import QRCode from 'easyqrcodejs'
const qrcode = ref()
console.log(QRCode)

const url = ref('')

const parmas = computed(() => {
  return new URL(url.value).search.slice(1).split('&').map(v => v.split('='))
})

watch(() => url.value, () => {
  console.log(new URL(url.value).search.slice(1).split('&').map(v => v.split('=')))
  qrcode.value.innerHTML = ''
  new QRCode(qrcode.value, url.value)
})

const parseUrl = () => {
  url.value = 'https://peterroe.icu?name=peterroe&age=21'
}
</script>

<template>
  <div>
    <div items="center">
      <section gap="2" flex my="3">
        <input
          v-model="url"
          border
          p="2"
          flex="1"
          placeholder="eg: https://peterroe.icu?name=peterroe&age=21"
        >
        <button px="4" rounded bg="blue-400" color="white-400" @click="parseUrl">
          粘贴
        </button>
      </section>
      <div ref="qrcode" flex justify="center" />
    </div>
  </div>
</template>
