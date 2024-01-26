<template>
    <div class="userAction">
        <div class="card_name">
            <span><strong><b>密码登录</b></strong></span>
        </div>
        <a-form style="width:100%;padding: 0 4vw 0 4vw;" :model="formState" name="basic" autocomplete="off"
            @finish="onFinish">
            <a-form-item name="email" :rules="[{ required: true, message: '请输入邮箱账号！', trigger: 'blur' }]">
                <a-input style="border-radius: 5px;" v-model:value="formState.email" placeholder="账号">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, validator: validPassword, trigger: 'blur' }]">
                <a-input-password style="border-radius: 5px;" v-model:value="formState.password" placeholder="密码">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item style="margin-bottom: 0;">
                <a-button :loading="loading" style="width: 100%;border-radius: 5px;" type="primary"
                    html-type="submit">登录</a-button>
            </a-form-item>
            <a-form-item>
                <span style="color:#c3c3c3">没有账号？</span><a-button style="padding: 0;" type="link"
                    @click="register">立即注册</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import { message } from "ant-design-vue"
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login, type LoginParams } from "@/api/login"
import router from '@/router';
import { useMenuStore } from '@/store/menu'
import { getMenuData } from '@/utils/fuc';
import routerData from "@/router/routerData";

interface FormState {
    email: string
    password: string
}

const socket: any = inject('socket')
const ws = socket()
const menuStore = useMenuStore()
const formState = reactive<FormState>({
    email: '2049434978@qq.com',
    password: '123456'
})
const loading = ref<boolean>(false)

async function onFinish(values: FormState) {
    loading.value = true
    const params: LoginParams = {
        email: values.email,
        password: values.password
    }
    try {
        const res = await login(params)
        if (res) {
            if (res.data.code === 200) {
                sessionStorage.setItem("token", res.data.data.token)
                sessionStorage.setItem("userId", res.data.data.id)
                sessionStorage.setItem("img", res.data.data.img)
                sessionStorage.setItem("username", res.data.data.username)
                const list = getMenuData(res.data.data.id, JSON.parse(JSON.stringify(routerData)))
                menuStore.updateList(list)
                sessionStorage.setItem("routerList", JSON.stringify(list))
                router.push("/home")
                location.reload()
            } else {
                message.error(res.data.msg)
            }
        }
    } catch (_) { }
    loading.value = false
}

function validPassword(_: any, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error('请输入密码!'));
        } else {
            if (value.length >= 6 && value.length <= 20) {
                const reg = /^[0-9A-Za-z]+$/
                if (reg.test(value)) {
                    resolve("");
                } else {
                    reject(new Error('密码只能包含数字和字母!'));
                }

            } else {
                reject(new Error('须在6 ~ 20个字符之间!'));
            }
        }
    })
}

function register() {
    router.push("/register")
}

</script>

<style lang="less" scoped>
.userAction {
    width: 420px;
    height: 300px;
    position: relative;
    background: #ffffff;
    border-radius: 15px;
    margin-right: 12vw;

    .card_name {
        text-align: left;
        padding-left: 12%;
        margin-top: 20px;
        margin-bottom: 32px;
        font-weight: 900;
        font-size: 20px;

        span {
            border-bottom: 4px solid #009AFD;
        }
    }

    .password_input {
        margin-bottom: 20px;
    }
}
</style>