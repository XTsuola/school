<template>
    <div class="header">
        <a-dropdown>
            <div class="header_right">
                <img style="width: 36px;height: 36px;border-radius: 50%;" :src="imgValue" />
                <span style="margin-left: 10px;color: #fff;">{{ username }}</span>
            </div>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a href="javascript:;" @click="exit">退出登录</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/store/menu'
import router from '@/router';
import { ref } from 'vue';

const imgValue = ref()
imgValue.value = 'http://127.0.0.1:7147/headImg/' + sessionStorage.getItem('img')

const menuStore = useMenuStore()
const username = ref("")
const name = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : ""
username.value = name ? name : ""

function exit() {
    sessionStorage.clear()
    localStorage.clear()
    menuStore.updateList([])
    router.push("/login")
    location.reload()
}

</script>

<style lang="less" scoped>
.header {
    position: relative;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #113D58;
    margin: 0;
    overflow: hidden;

    .header_bg {
        // flex: 1;
        height: 50px;
        // -webkit-user-drag: none;
    }

    .header_right {
        position: absolute;
        right: 0;
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