<script setup lang="ts">
import { UButton, UInput, UTag, message } from 'ungeui'
import type { Ref } from 'vue'

const binary = ref('')
const octal = ref('')
const decimal = ref('')
const hex = ref('')

const alertError = (type: string) => {
  message.danger({
    text: `请输入正确的${type}进制格式`,
    maxCount: 3,
  })
}

// watch([binary], () => {
//   // binary to decimal
//   decimal.value = binary.value.split('').map(it => parseInt(it)).reduce((a, b) => a * 2 + b, 0)
// })

// watch([octal], () => {
//   // octal to decimal
//   decimal.value = binary.value.split('').map(it => parseInt(it)).reduce((a, b) => a * 8 + b, 0)
// })

const decimalUpdate = (newValue: any) => {
  console.log(newValue)
  if (!/^[0-9]*$/.test(newValue)) {
    alertError('十')
    return
  }
  // decimal to binary
  // newValue = Number(newValue)
  binary.value = Number(newValue).toString(2)

  octal.value = Number(newValue).toString(8)

  hex.value = Number(newValue).toString(16)
}

const binaryUpdate = (newValue: string) => {
  if (!/^[0-1]*$/.test(newValue)) {
    alertError('二')
    return
  }

  decimal.value = newValue.split('').map(it => parseInt(it)).reduce((a, b) => a * 2 + b, 0)
  decimalUpdate(decimal.value)
}

const octalUpdate = (newValue: string) => {
  // console.log(newValue, binary.value)
  if (!/^[0-8]*$/.test(newValue)) {
    alertError('八')
    return
  }

  // octal to decimal
  decimal.value = newValue.split('').map(it => parseInt(it)).reduce((a, b) => a * 8 + b, 0)
  decimalUpdate(decimal.value)
}

const letterMap = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  a: '10',
  b: '11',
  c: '12',
  d: '13',
  e: '14',
  f: '15',
  A: '10',
  B: '11',
  C: '12',
  D: '13',
  E: '14',
  F: '15',
}
const hexUpdate = (newValue: string) => {
  if (!/^[0-9|a-f|A-F]*$/.test(newValue)) {
    alertError('十六')
    return
  }
  // hex to decimal
  decimal.value = newValue.split('').map(it => Number(letterMap[it])).reduce((a, b) => a * 16 + b, 0)
  decimalUpdate(decimal.value)
}

const targetRefArray: Array<[any, (_: any) => void]> = [[binary, binaryUpdate], [octal, octalUpdate], [decimal, decimalUpdate], [hex, hexUpdate]]

const parseClipBoard = async(id: number) => {
  const text = await navigator.clipboard.readText()
  targetRefArray[id][0].value = text
  targetRefArray[id][1](text)
}

const copyToClipBoard = async(id: number) => {
  await navigator.clipboard.writeText(targetRefArray[id][0].value)
  message.success({
    text: '复制成功',
    maxCount: 3,
  })
}

onMounted(() => {
  hexUpdate('c')
})
</script>

<template>
  <div>
    <div flex="~" gap="2" items="center" mb="3">
      <u-tag type="info">
        二进制:
      </u-tag>
      <u-input :value="binary" w="30" size="large" @update:value="(v: any) => binaryUpdate(v)" />
      <u-button deep @click="parseClipBoard(0)">
        粘贴
      </u-button>
      <u-button @click="copyToClipBoard(0)">
        复制
      </u-button>
    </div>
    <div flex="~" gap="2" items="center" mb="3">
      <u-tag type="info">
        八进制:
      </u-tag>
      <u-input :value="octal" w="30" size="large" @update:value="(v: any) => octalUpdate(v)" />
      <u-button deep @click="parseClipBoard(1)">
        粘贴
      </u-button>
      <u-button @click="copyToClipBoard(1)">
        复制
      </u-button>
    </div>
    <div flex="~" gap="2" items="center" mb="3">
      <u-tag type="info">
        十进制:
      </u-tag>
      <u-input v-model:value="decimal" w="30" size="large" @update:value="(v: any) => decimalUpdate(v)" />
      <u-button deep @click="parseClipBoard(2)">
        粘贴
      </u-button>
      <u-button @click="copyToClipBoard(2)">
        复制
      </u-button>
    </div>
    <div flex="~" gap="2" items="center" mb="3">
      <u-tag type="info">
        十六进制:
      </u-tag>
      <u-input :value="hex" w="30" size="large" @update:value="(v: any) => hexUpdate(v)" />
      <u-button deep @click="parseClipBoard(3)">
        粘贴
      </u-button>
      <u-button @click="copyToClipBoard(3)">
        复制
      </u-button>
    </div>
  </div>
</template>
