<template>
  <div class="father">
    <div class="son">
      hello
    </div>
    <div />
  </div>
</template>

<style>
  .father {
  height: 200px;
  width: 300px;
  background: #e77975;
  text-align: center;
}

.son {
  width: 50px;
  height: 50px;
  background: #77da89;
  display: inline-block;
  vertical-align: middle;
}

.father::before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
