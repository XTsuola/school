<template>
    <div class="main_header">
        <div class="header_left">
            <a-breadcrumb style="margin-left: 10px;">
                <a-breadcrumb-item v-for="item in breadData">{{
                    seachroutesData.find((e: any) => e.key ===
                        item)?.label
                }}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';
import { useRoute, onBeforeRouteUpdate, type RouteLocationNormalized } from 'vue-router';

const breadData = ref<string[]>([])
const mql = window.matchMedia('(max-width: 768px)')
const emits = defineEmits(["showMenu"])
const routes = router.getRoutes()
const route = useRoute()
const filterUndefined = (item: any) => typeof item !== "undefined"
const seachroutesData = routes.map((item: any) => {
    if (item.meta.key) {
        return {
            key: item.meta.key,
            label: item.meta.label
        }
    } else {
        return undefined
    }
}).filter(filterUndefined)

function showBreadCrumb(to?: RouteLocationNormalized, from?: RouteLocationNormalized) {
    if (to) {
        breadData.value = to.path.split("/").splice(1, route.path.split("/").length)
    }
}
showBreadCrumb(route)

onBeforeRouteUpdate(showBreadCrumb) // 监听路由变化，变化后改变面包屑展示

</script>
<style lang="less" scoped>
.main_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin: 0;
    padding-left: 24px;
    height: 40px;

    .header_left {
        display: flex;
        justify-content: flex-start;

        .showIcon {
            font-size: 20px
        }
    }

    .header_right {
        height: 50px;
        margin-right: 40px;
        display: flex;
        justify-content: flex-end;
        text-align: right;
        align-items: center;
        flex-wrap: nowrap;
        cursor: pointer;
    }
}
</style>