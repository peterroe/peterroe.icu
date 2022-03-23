<script setup lang="ts">
// import Tribute from "tributejs";
// import 'Tributejs/dist/tribute.css'
// var tribute = new Tribute({
//   values: [
//     { key: "Phil Heartman", value: "pheartman" },
//     { key: "Gordon Ramsey", value: "gramsey" }
//   ]
// });
//  onMounted(() => {
//    tribute.attach(document.querySelector("#tributeNode"));
//  })
</script>

<template>
  <div>
    <input
      type="text"
      id="tributeNode"
      cols="30"
      rows="10"
      class="border resize-none"
    />
  </div>
</template>