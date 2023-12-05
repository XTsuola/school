<template>
    <a-layout-sider width="230" style="overflow-y: auto;" class="sider" v-if="flag">
        <menuList style="height: calc(100% - 60px);"></menuList>
    </a-layout-sider>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import menuList from "../layout/menuList.vue"

const id = sessionStorage.getItem("userId")
const flag = ref<boolean>(false)
if (id === "1") {
    flag.value = true
} else {
    flag.value = false
}

</script>

<style lang="less" scoped>
aside {
    background-color: #404040;
}

:deep(.ant-drawer-body) {
    padding: 0;
}

::-webkit-scrollbar {
    width: 4px;
}
</style>