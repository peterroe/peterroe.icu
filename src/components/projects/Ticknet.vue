<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-10 16:09:33
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-10 17:47:00
-->
<template>
  <div class="flex justify-center">
    <div text-base my-auto flex justify-center 
      class="mr-10">Scroll it down <div i-carbon-arrow-right my-auto mr-1 />
    </div>
    <div class="w-full md:w-3\/5 h-183 bg-black
    border-3 rounded-10 p-2  overflow-hidden relative">
      <div class="w-full text-center h-18 lh-18">
        <div i-carbon-progress-bar-round class="text-warm-gray-300"></div>
      </div>
      
      <iframe
      class=" h-145 w-full bg-white
       m-auto
      "
      src="http://www.ticknet.hnust.cn/#/layer/home"
      frameborder="0"></iframe>
      <div class="w-full flex justify-around pt-20px text-white">
        <div i-carbon-list></div>
        <div i-carbon-home></div>
        <div i-carbon-arrow-left></div>
      </div>
    </div>
    </div>
</template>
