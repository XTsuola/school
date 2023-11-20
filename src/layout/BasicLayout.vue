<template>
    <div class="BasicLayout">
        <headerTitle></headerTitle>
        <div class="ContentVue">
            <sidebarVue ref="sider" />
            <div class="main">
                <mainHeaderTitle v-if="true" style="width: 100%;" @showMenu="showMenu"></mainHeaderTitle>
                <!-- <div style="height: 40px;">交友平台</div> -->
                <mainVue style="width: 100%;" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import sidebarVue from './Sidebar.vue'
import mainVue from './Main.vue'
import mainHeaderTitle from "./MainHeaderTitle.vue"
import headerTitle from "./Header.vue"
import { ref } from 'vue';

const sider = ref()

function showMenu() {
    sider.value.showMenu()
}

</script>
<style lang="less" scoped>
.BasicLayout {
    .ContentVue {
        display: flex;
        justify-content: space-between;

        .main {
            padding: 0;
            margin: 0;
            height: calc(100vh - 50px);
            width: 100%;
        }
    }
}</style>