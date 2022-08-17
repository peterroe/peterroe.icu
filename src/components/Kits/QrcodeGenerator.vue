<script setup lang="ts">
import QRCode from 'easyqrcodejs'
import { UButton, UCheckbox, UInput, USpace } from 'ungeui'

const qrcode = ref()
const url = ref('')
const isParseExpression = ref(false) // 是否解析表达式
const isParseParams = ref(false) // 是否解析参数
const isDecodeParams = ref(false) // 是否解码参数

watch([url, isParseExpression, isParseParams, isDecodeParams], () => {
  // console.log(new URL(url.value).search.slice(1).split('&').map(v => v.split('=')))
  if (isParseExpression.value && url.value.startsWith('`'))
    url.value = eval(url.value)

  qrcode.value.innerHTML = ''
  url.value && new QRCode(qrcode.value, url.value)
})

const params = computed(() => {
  if (!isParseParams.value) return []
  try {
    return new URL(url.value).search.slice(1).split('&').filter(it => it.length).map(v => v.split('='))
  }
  catch (e) {
  }
})
const parseUrl = async() => {
  url.value = await navigator.clipboard.readText()
}

const paramValueChange = (item: Array<string>, newValue: string) => {
  item[1] = newValue
  const urlInstance = new URL(url.value)
  urlInstance.searchParams.set(item[0], item[1])
  url.value = urlInstance.toString()
}
</script>

<template>
  <div>
    <div items="center">
      <u-checkbox v-model:checked="isParseExpression">
        解析表达式
      </u-checkbox>
      <u-checkbox v-model:checked="isParseParams">
        解析参数
      </u-checkbox>
      <u-checkbox v-model:checked="isDecodeParams">
        Decode参数
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
      <div flex="~ wrap" gap-y="5" mb="10" justify="between">
        <span v-for="item in params" :key="item[0]">
          <u-input v-model:value="item[0]" disabled w="30" color="black" />
          <u-input :value="isDecodeParams ? decodeURIComponent(item[1]) : item[1]" w="45" @update:value="(newValue: any) => paramValueChange(item, newValue)" />
        </span>
      </div>
      <div ref="qrcode" flex justify="center" />
    </div>
  </div>
</template>
