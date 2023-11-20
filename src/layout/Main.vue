<template>
    <div class="mainDiv">
        <a-layout-content style="background: #fff;min-height: 280px; height:100%;width: 100%;overflow-y: auto;">
            <RouterView />
        </a-layout-content>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute()

router.push({
    path: route.fullPath
})

</script>

<style lang="less" scoped>
.mainDiv {
    background: #F0F2F5;
    width: 100%;
    height: calc(100% - 40px);
    padding: 24px;
}
</style>