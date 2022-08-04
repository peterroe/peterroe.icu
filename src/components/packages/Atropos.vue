<template>
  <div id="app">
    <atropos class="my-atropos">
      <div class="a">
        <!-- hello -->
      </div>
    </atropos>
  </div>
</template>

<script>
// import Atropos component
import Atropos from 'atropos/vue'

export default {
  // register Atropos component
  components: {
    Atropos,
  },
}
</script>

<style>
@import 'atropos/scss';

.my-atropos {
  width: 320px;
  height: 160px;
  margin: 0 auto;
  text-align: center;
}
.a {
  border-radius: 10px;
  height: 160px;
  background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
}
</style>
