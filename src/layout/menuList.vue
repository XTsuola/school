<template>
    <a-menu style="background: #404040;" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
        :style="{ height: '100%', borderRight: 0 }">
        <MenuItem v-for="item in BaseRoute" :menu="item">
        </MenuItem>
    </a-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import MenuItem from './menuItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu'
import baseRoute from "../router/routerData"

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const BaseRoute: any = menuStore.list
const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const routerKey = router.getRoutes().find(e => e.path === route.path)

function updateMenu(arr: string[]) {
    if (!arr[0]) {
        arr.shift()
        arr.pop()
        openKeys.value = arr
    } else {
        arr.pop()
        openKeys.value = arr
    }
}

const list: any = []
function getnoShowRoute(data: any) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length > 0) {
            getnoShowRoute(data[i].children)
        } else {
            if (data[i].meta.isAddPage === true) {
                list.push(data[i])
            }
        }
    }
}
getnoShowRoute(baseRoute)

function updatePath(routerObj: any) {
    if (routerObj && routerObj.meta && routerObj.meta.key) {
        if (list.findIndex((item: any) => item.path === routerObj.meta.key) === -1) {
            selectedKeys.value = []
            selectedKeys.value.push(routerObj.meta.key)
            const arr = route.path.split('/')
            updateMenu(arr)
        }
    }
}
updatePath(routerKey)

watch(route, (val) => {
    updatePath(val)
})

</script>

<style lang="less" scoped>
:deep(.ant-menu-submenu) {
    color: #ffffff;
}

:deep(.ant-menu) {
    background: #404040;
}

:deep(.ant-menu-item) {
    color: #ffffff;
    background: #404040 !important;
    
}

:deep(.ant-menu-dark) {
    background: #404040 !important;
}

:deep(.ant-menu-inline) {
    background: #404040 !important;
}

:deep(.ant-menu-sub) {
    background: #404040 !important;
}

:deep(.ant-menu-dark) {
    color: #21B896 !important;
}

:deep(.ant-menu-item:hover) {
    color: #21B896 !important;
}

:deep(.ant-menu-submenu-open) {
    color: #21B896;
}

:deep(.ant-menu-submenu-title:hover) {
    color: #21B896;
}

:deep(.ant-menu-submenu:hover) {
    color: #21B896;
}

:deep(.ant-menu-item-submenu:hover) {
    color: #21B896;
}

:deep(.ant-menu-item-active) {
    color: #21B896;
}

:deep(.ant-menu-item-active:hover) {
    color: #21B896;
}

:deep(.ant-menu-item-selected) {
    color: #21B896 !important;
}

:deep(.ant-menu-item-selected:hover) {
    color: #21B896;
}

:deep(.ant-menu-submenu-arrow) {
    color: #ffffff;
}

:deep(.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow) {
    color: #21B896;
}

:deep(.ant-menu-submenu:hover > .ant-menu-submenu-title) {
    color: #21B896;
}

:deep(.ant-menu-submenu > .ant-menu-submenu-title) {
    color: #ffffff;
}

:deep(.ant-menu-submenu-selected > .ant-menu-submenu-title) {
    color: #21B896;
}

:deep(.ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow) {
    color: #21B896;
}

:deep(.ant-menu-item::after) {
    border-right: 3px solid #21B896;
}
</style>