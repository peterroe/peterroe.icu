<template>
  <div id="layout-sb" text-center my-10 overflow-hidden>
    <div class="center">
      center
    </div>
    <div class="left">
      left
    </div>
    <div class="right">
      right
    </div>
  </div>
</template>

<style>
#layout-sb {
  padding: 0 100px;
}

.center {
  width: 100%;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.left {
  width: 100px;
  margin-left: -100%;
 background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  position: relative;
  left: -100px;
}

.right {
  width: 100px;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  margin-left: -100px;
  position: relative;
  left: 100px;
}

.center,
.left,
.right {
  float: left;
}
</style>