<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
})
const imgRef = ref()

onMounted(() => {
  const { innerHeight, innerWidth } = window
  const windowScale = innerWidth / innerHeight
  const { naturalHeight, naturalWidth} = imgRef.value
  const imgScale = naturalWidth / naturalHeight
  
  if(windowScale > imgScale) { // 以高为准
    imgRef.value.style.height = '70vh'
  } else {
    imgRef.value.style.width = '70vw'
  }
})
</script>

<template>
  <div class="viewer-bg">
    <img ref="imgRef" class="viewer-img" :src="src" /> 
  </div>
</template>

<style scoped>
.viewer-bg {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.viewer-img {
  /* height: 80vh; */
  /* width: 80vw; */
  background-color: #fff;
  animation: disappear .5s;
}

@keyframes disappear {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>