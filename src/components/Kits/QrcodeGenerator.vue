<script setup lang="ts">
import QRCode from 'easyqrcodejs'
import { UButton, UCheckbox, UInput } from 'ungeui'

const qrcode = ref()
const url = ref('')
const isParseExpression = ref(false)

watch([url, isParseExpression], () => {
  // console.log(new URL(url.value).search.slice(1).split('&').map(v => v.split('=')))
  if (isParseExpression.value && url.value.startsWith('`'))
    url.value = eval(url.value)

  qrcode.value.innerHTML = ''
  url.value && new QRCode(qrcode.value, url.value)
})

const parmas = computed(() => {
  try {
    return new URL(url.value).search.slice(1).split('&').map(v => v.split('='))
  }
  catch (e) {
  }
})

const parseUrl = async() => {
  url.value = await navigator.clipboard.readText()
}
</script>

<template>
  <div>
    <div items="center">
      <u-checkbox v-model:checked="isParseExpression">
        解析表达式
      </u-checkbox>
      <section gap="4" flex my="3" items="center">
        <u-input
          v-model:value="url"
          flex="1"

          size="large"
          placeholder="eg: https://peterroe.icu?name=peterroe&age=21"
        />
        <u-button deep size="medium" @click="parseUrl">
          粘贴
        </u-button>
      </section>
      <div ref="qrcode" flex justify="center" />
    </div>
  </div>
</template>
