<template>
    <a-sub-menu :key="menu.meta.key" v-if="menu.meta?.menuType === 'folder' && menu.meta?.isShow">
        <template #icon>
            <component v-if="menu.meta && menu.meta.icon" :is="getMenuIcon(menu.meta.icon)"></component>
        </template>
        <template #title>{{ menu.meta?.label }}</template>
        <menuItem v-for="item in menu.children" :menu="item">
        </menuItem>
    </a-sub-menu>
    <a-menu-item :style="{ borderBottom: menu.meta?.isHome ? '1px solid rgba(255,255,255,.2)' : 0 }" :key="menu.meta?.key"
        @click="goView" v-if="menu.meta?.menuType === 'menu' && (menu.meta.isShow || menu.meta.isHome)">
        <template #icon>
            <component v-if="menu.meta && (list.findIndex((item: any) => item === menu.meta?.key) != -1) && menu.meta.icon"
                :is="getMenuIcon(menu.meta.icon)">
            </component>
        </template>
        {{ menu.meta?.label }}
    </a-menu-item>
</template>

<script lang="ts" setup>
import { useRouter, type RouteRecordRaw } from "vue-router";
import * as icon from "@ant-design/icons-vue"

interface Prop {
    menu: RouteRecordRaw
}

const list = ["home", "informationManage", "approvalManage"]
const router = useRouter()
const prop = defineProps<Prop>()

function goView() {
    let path = router.getRoutes().find(e => e.path.split("/").pop() === prop.menu.path)
    if (!path) {
        path = router.getRoutes().find(e => e.path === prop.menu.path)
    } else {
        router.push({
            path: path.path
        })
    }
}

function getMenuIcon(menuIcon: string) {
    type MenuIconType = keyof typeof icon;
    return icon[menuIcon as MenuIconType]
}

</script>

<style lang="less" scoped>

</style>