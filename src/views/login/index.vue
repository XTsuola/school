<template>
    <div class="main">
        <div class="header">
            
        </div>
        <div class="center">
            <div class="name">
                <!-- <p class="cn">校园交友平台</p> -->
            </div>
            <Login v-if="path === '/login'"></Login>
            <Register v-if="path === '/register'"></Register>
        </div>
        <div class="flooter">
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import Login from "./login.vue"
import Register from "./register.vue"
import { useRoute } from 'vue-router';
import { ref, watch } from "vue";

const route = useRoute()
const path = ref<string>(route.path)

watch(route, (val) => {
    path.value = val.path
})

</script>
<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f4f4f4;
    overflow: hidden;

    .header {
        padding: 0 30px 0 30px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        font-size: 16px;
        align-items: center;

        div {
            font-weight: bold;
        }

        img {
            width: 100%;
            height: 100%;
        }

        overflow: hidden;
    }

    .center {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-image: url("@/assets/img/homePage.png");
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;

        .name {
            margin-left: 12vw;
            color: #ffffff;

            .cn {
                font-size: 30px;
                font-weight: 600;
                letter-spacing: 3px;
                margin-bottom: 0;
            }
        }
    }

    .flooter {
        padding: 15px 30px 15px 30px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        overflow: hidden;

        div {
            font-weight: bold;
        }
    }

}

:deep(.ant-input) {
    background-color: #E8F0FD;
    border: 1px solid #E8F0FD;

    input {
        background-color: #E8F0FD;
    }
}

:deep(.ant-input-affix-wrapper) {
    background-color: #E8F0FD;
    border: 1px solid #E8F0FD;

    input {
        background-color: #E8F0FD;
    }
}
</style>