<script setup>
import { UWaterfall } from 'uwaterfall'
// import 'uwaterfall/style.css'
</script>

<template>
  <div class="life">
    <UWaterfall :columnCount="4">
      <div class="item" border border-gray rounded-xl>
        <img src="https://i.pinimg.com/474x/db/73/e2/db73e2452188e486ee087a3702dd249b.jpg"/>
        <div p-3 class="word">
          没有最终的成功，也没有致命的失败，最可贵的是继续前进的勇气
          <br>
          --- 2022-2-20
        </div>
      </div>
      <div class="item" border border-gray rounded-xl>
        <img src="https://i.pinimg.com/474x/03/b4/b0/03b4b0435157db8291714d6488b67a23.jpg"/>
        <div p-3 class="word">
          今日雾霾蔽日，但是不要害怕，太阳依旧在云端
          <br>
          --- 2022-2-21
        </div>
      </div>
    </UWaterfall>
  </div>
</template>

<style>
.life img {
  margin-top: 0;
  margin-bottom: 0;
}
</style>

<style scoped>
.item {
  break-inside: avoid;
  text-align: justify;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
