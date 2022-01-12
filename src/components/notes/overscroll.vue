<script setup lang="ts">

</script>

<template>
    <div mb-5 border h-400px overflow-auto>
        <div h-600px>
            <div m-auto mt-10 border h-100px w-200px overflow-auto>
                <div h-200px p-2>
                    请把鼠标放到这里，滚轮一直向下滚动
                </div>
            </div>
        </div>
    </div>
    使用另一个值后，不会触发父盒子的滚动：
    <div mt-5 border h-400px overflow-auto>
        <div h-600px>
            <div class="contain" mt-10 m-auto border h-100px w-200px overflow-auto>
                <div h-200px p-2>
                    请把鼠标放到这里，滚轮一直向下滚动
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.contain {
    overscroll-behavior-y: contain;
}
</style>