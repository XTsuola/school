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
                        <a @click="showInfo">个人信息</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;" @click="exit">退出登录</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
        <a-modal v-model:visible="visible" destroyOnClose title="个人信息修改" :maskClosable="false">
            <a-form ref="userInfoRef" style="width: 100%;" :model="detailData" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
                <a-form-item label="账号">
                    <a-input disabled v-model:value="detailData.email"></a-input>
                </a-form-item>
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
                    <a-input v-model:value="detailData.username" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="头像" name="img" :rules="[{ required: true, message: '请选择头像！', trigger: 'change' }]">
                    <div style="position: relative;width: 36px; height: 36px; border-radius: 50%; overflow: hidden;">
                        <img class="headImg" :src="detailData.img ? detailData.img : BaseImg"
                            style="width: 36px;height: 36px;" />
                        <input style="opacity: 0;position: absolute;width: 36px;height: 36px;right: 0;top: 0;" type="file"
                            @input="getImg" />
                    </div>
                </a-form-item>
                <a-form-item label="标签" name="tag" :rules="[{ required: true, message: '请选择标签!' }]">
                    <a-select v-model:value="detailData.tag" mode="multiple" style="width: 100%" placeholder="请选择"
                        :options="tagList"></a-select>
                </a-form-item>
                <a-form-item label="修改密码">
                    <a-radio-group v-model:value="detailData.flag">
                        <a-radio :value="false">否</a-radio>
                        <a-radio :value="true">是</a-radio>

                    </a-radio-group>
                </a-form-item>
                <a-form-item v-if="detailData.flag" label="新密码" name="password"
                    :rules="[{ required: true, message: '请输入密码!', trigger: 'blur' }]">
                    <a-input-password v-model:value="detailData.password" placeholder="请输入"></a-input-password>
                </a-form-item>
                <a-form-item v-if="detailData.flag" label="确认密码" name="confirm_password" :rules="[{
                    required: true, validator: validConfPassword, trigger: 'blur'
                }]">
                    <a-input-password style="border-radius: 5px;" v-model:value="detailData.confirm_password" />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/store/menu'
import router from '@/router';
import { inject, reactive, ref } from 'vue';
import { getTagList, getUserDetail, type EditUserType, editUser } from '@/api/system';
import { message } from 'ant-design-vue';

const socket: any = inject('socket')
const ws = socket()
const BaseImg: any = new URL("@/assets/img/touxiang.jpg", import.meta.url)
const imgValue = ref()


imgValue.value = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + sessionStorage.getItem('img')
const menuStore = useMenuStore()
const username = ref("")
const name = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : ""
const id = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : ""
username.value = name ? name : ""
const visible = ref(false)
const detailData = reactive({
    id: parseInt(id as string),
    username: "",
    tag: [],
    tagObj: [],
    img: "",
    email: "",
    password: "",
    confirm_password: "",
    flag: false
})
const loading = ref(false)
const userInfoRef = ref()
const tagList = ref([])

async function showInfo() {
    getTagListSelect()
    visible.value = true
    detailData.flag = false
    detailData.username = detailData.img = detailData.email = ""
    detailData.tagObj = []
    const res = await getUserDetail(id ? parseInt(id) : 0)
    if (res.data.code === 200) {
        detailData.id = res.data.rows.id
        detailData.username = res.data.rows.username
        detailData.img = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + res.data.rows.img
        detailData.email = res.data.rows.email
        detailData.tagObj = res.data.rows.tagObj
        detailData.tag = res.data.rows.tag
    }
}

async function handleOk() {
    await userInfoRef.value?.validate()
    const reg = /^data:image/
    const params: EditUserType = {
        id: detailData.id,
        username: detailData.username,
        tag: detailData.tag,
    }
    if (reg.test(detailData.img)) {
        params.img = detailData.img
    }
    if (detailData.flag) {
        params.password = detailData.password
    }
    const res = await editUser(params)
    if (res.data.code === 200) {
        visible.value = false
        const res2 = await getUserDetail(detailData.id)
        if (res2.data.code == 200) {
            sessionStorage.setItem("username", res2.data.rows.username)
            sessionStorage.setItem("img", res2.data.rows.img)
            if (params.password) {
                message.error("您修改了密码，请重新登录！")
                sessionStorage.clear()
                localStorage.clear()
                menuStore.updateList([])
                router.push("/login")
            } else {
                location.reload()
            }
        }
    }
}

function getImg(e: Event) {
    const target = e.target as any
    if (target) {
        const reader = new FileReader()
        reader.readAsDataURL(target.files[0])
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                detailData.img = e.target.result
                await userInfoRef.value?.validate(["img"])
            }
        })
    }
}

function validConfPassword(_: any, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!value) {
            reject(new Error('请再次输入密码!'));
        } else {
            if (value != detailData.password) {
                reject(new Error('密码不一致!'));
            } else {
                resolve("");
            }
        }
    })
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

function exit() {
    sessionStorage.clear()
    localStorage.clear()
    menuStore.updateList([])
    let msg = {
        code: 'logout',
        id: id
    }
    ws.send(JSON.stringify(msg))
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