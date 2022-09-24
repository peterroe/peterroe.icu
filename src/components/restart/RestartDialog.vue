<template>
  <div>
    <dialog id="myFirstDialog" style="width:50%;background-color:#F4FFEF;border:1px dotted black;">
      您好，欢迎来到我的博客！
      <button id="hide">
        关闭
      </button>
    </dialog>

    <button id="show">
      显示 Dialog
    </button>
  </div>
</template>

<script setup>

onMounted(() => {
  const dialog = document.getElementById('myFirstDialog')
  document.getElementById('show').onclick = function() {
    dialog.show()
  }
  document.getElementById('hide').onclick = function() {
    dialog.close()
  }
})
</script>
