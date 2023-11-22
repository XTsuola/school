<template>
    <div class="userAction">
        <div class="card_name">
            <span><strong><b>欢迎注册校园交友平台</b></strong></span>
        </div>
        <a-form ref="formRef" :model="formState" name="basic" :wrapper-col="{ span: 14, offset: 1 }" autocomplete="off"
            @finish="onFinish" hideRequiredMark :label-col="{ span: 6 }">
            <a-form-item label="邮箱地址" name="email" :rules="[{ required: true, strigger: 'blur' }]">
                <a-input style="border-radius: 5px;" v-model:value="formState.email" />
            </a-form-item>
            <a-form-item label="密码" name="password"
                :rules="[{ required: true, message: '请输入密码！', trigger: 'blur' }, { max: 20, min: 1, trigger: 'blur' }]">
                <a-input-password style="border-radius: 5px;" v-model:value="formState.password" />
            </a-form-item>
            <a-form-item label="确认密码" name="confirm_password" :rules="[{
                required: true, validator: validConfPassword, trigger: 'blur'
            }]">
                <a-input-password style="border-radius: 5px;" v-model:value="formState.confirm_password" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 17, offset: 7 }">
                <div style="width: 100%;display:flex;">
                    <a-button style="border-radius: 5px;" type="primary" html-type="submit"
                        :loading="loading">立即注册</a-button>
                    <a-button @click="goBack" type="text"
                        style="border-radius: 5px;margin-left: 20px;background: #ccc;color: #fff;">使用已有账号</a-button>
                </div>
            </a-form-item>
        </a-form>
        <a-modal v-model:visible="visible" destroyOnClose title="用户信息" :maskClosable="false">
            <a-form ref="addParamsRef" :model="addParams" name="basic" :wrapper-col="{ span: 14, offset: 1 }"
                autocomplete="off" @finish="onFinish" hideRequiredMark :label-col="{ span: 6 }">
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!', trigger: 'blur' }]">
                    <a-input v-model:value="addParams.username" />
                </a-form-item>
                <a-form-item label="头像" name="img" :rules="[{ required: true, message: '请选择头像！', trigger: 'change' }]">
                    <div style="position: relative;width: 36px; height: 36px; border-radius: 50%; overflow: hidden;">
                        <img class="headImg" :src="addParams.img ? addParams.img : BaseImg" style="" />
                        <input style="opacity: 0;position: absolute;width: 36px;height: 36px;right: 0;top: 0;" type="file"
                            @input="getImg" />
                    </div>
                </a-form-item>
                <a-form-item label="标签" name="tag" :rules="[{ required: true, message: '请选择标签!' }]">
                    <a-select v-model:value="addParams.tag" mode="multiple" style="width: 100%" placeholder="请选择"
                        :options="tagList"></a-select>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { message } from "ant-design-vue"
import { registerUser } from '@/api/login'
import router from '@/router';
import { getTagList } from '@/api/system';

interface FormState {
    email: string
    password: string
    confirm_password: string
}

const BaseImg: any = new URL("@/assets/img/touxiang.jpg", import.meta.url)

const formRef = ref()
const addParamsRef = ref()
const loading = ref<boolean>(false)
const formState = reactive<FormState>({
    email: "2049434978@qq.com",
    password: "123456",
    confirm_password: "123456"
})
const visible = ref(false)
const addParams = reactive({
    username: "索灵",
    img: "",
    tag: [1]
})
const tagList = ref([])

function validEmail(_: any, value: any): any {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error('请输入邮箱!'));
        } else {
            let emailReg = new RegExp(/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/);
            if (!emailReg.test(value)) {
                reject(new Error('请输入正确的邮箱!'));
            } else {
                resolve("");
            }
        }
    })
}

function validConfPassword(_: any, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error('请再次输入密码!'));
        } else {
            if (value != formState.password) {
                reject(new Error('密码不一致!'));
            } else {
                resolve("");
            }
        }
    })
}

async function handleOk() {
    await addParamsRef.value?.validate()
    const params = { ...formState, ...addParams }
    const res = await registerUser(params)
    try {
        if (res.data.code === 200) {
            visible.value = false
            router.go(-1)
            message.success("注册成功")
        } else {
            message.error(res.data.msg)
        }
    } catch (_) {
        message.error("注册失败")
    }

}

async function onFinish() {
    visible.value = true
}

function getImg(e: Event) {
    const target = e.target as any
    if (target) {
        const reader = new FileReader()
        reader.readAsDataURL(target.files[0])
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                addParams.img = e.target.result
                await addParamsRef.value?.validate(["img"])
            }
        })
    }
}

async function getTagListSelect() {
    const res = await getTagList({})
    if (res.data.code === 200) {
        tagList.value = res.data.rows.map((item: any) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
}

function goBack() {
    router.push("/login")
}

onMounted(() => {
    getTagListSelect()
})

</script>

<style lang="less" scoped>
.userAction {
    width: 480px;
    height: 300px;
    position: relative;
    background: #ffffff;
    border-radius: 15px;
    margin-right: 12vw;

    .card_name {
        position: relative;
        text-align: left;
        padding-left: 6%;
        margin-top: 8px;
        margin-bottom: 20px;
        font-size: 20px;
        border-bottom: 2px solid #ccc;

        img {
            position: absolute;
            height: 52px;
            left: 20px;
            top: -28px;
        }
    }
}

.headImg {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
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

:deep(.sendCode > .ant-btn-loading-icon) {
    display: none;
}
</style>