<template>
    <div class="userManage">
        <div style="display: flex;justify-content: space-between;overflow: hidden;width: 100%;">
            <div style="width: calc(100% - 380px);border: 2px solid #ccc;border-radius: 10px;padding: 10px;">
                <div style="margin-bottom: 5px;">
                    <a-button @click="randomMatching()" style="margin-right: 10px;background: #87d068;border: #87d068;"
                        type="primary">随机匹配</a-button>
                    <a-button @click="interestMatching()" style="margin-right: 10px;background: orange;border: orange;"
                        type="primary">兴趣匹配</a-button>
                    <a-input v-model:value="email" style="width: 200px;margin-right: 2px;" />
                    <a-button type="primary" style="margin-right: 10px;" @click="emailSearch">账号搜索</a-button>
                    <a-button @click="reset">清空</a-button>
                </div>
                <a-table style="height: 250px;overflow-y: hidden;" :scroll="{ y: 200 }" :columns="columns"
                    :data-source="tableData" :pagination="false" bordered>
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'username'">
                            <a @click="openDetail(record)">{{ record.username }}</a>
                        </template>
                        <template v-if="column.key === 'tagObj'">
                            <a-tag v-for="item in record.tagObj"
                                style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;" :color="item.color">{{
                                    item.name }}</a-tag>
                        </template>
                        <template v-if="column.key === 'action'">
                            <span
                                style="display: flex;justify-content: center;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                                <a-button v-if="record.status == 1 || record.status == 2" type="link" size="small"
                                    disabled>{{ record.status == 1 ? "已是好友" : "等待回复" }}</a-button>
                                <a-button v-else type="link" size="small" @click="showAddFriend(record.id)">添加好友</a-button>
                            </span>
                        </template>
                    </template>
                </a-table>
            </div>
            <div style="width:360px;border: 2px solid #cccccc;border-radius: 10px;padding: 5px;overflow:hidden;">
                <div style="height: 10%;border-bottom: 1px solid #ccc;">新朋友：</div>
                <div style="height: 40%;width: 100%;display: flex;justify-content: flex-start;overflow:auto">
                    <div v-for="item in imgData1" style="text-align: center;padding-top: 15px;">
                        <img @click="openDetail(item, item.testInfo)" :src="baseUrl + item.img"
                            style="width: 36px;height: 36px;border-radius: 50%;" />
                        <div style="text-align: center;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
                            <span @click="openDetail(item, item.testInfo)">{{ item.username }}</span>
                        </div>
                        <div style="display: flex;justify-content: center;align-items: center;">
                            <a-popconfirm title="确定同意该好友吗?" ok-text="确定" cancel-text="取消" @confirm="okFirends(item.id)">
                                <a-button type="link" size="small">同意</a-button>
                            </a-popconfirm>
                            <a-popconfirm title="确定拒绝该好友吗?" ok-text="确定" cancel-text="取消" @confirm="noFirends(item.id)">
                                <a-button type="link" size="small" danger>拒绝</a-button>
                            </a-popconfirm>
                        </div>
                    </div>
                </div>
                <div style="height: 10%;border-bottom: 1px solid #ccc;">我的申请：</div>
                <div style="height: 40%;width: 100%;display: flex;justify-content: flex-start;overflow:auto">
                    <div v-for="item in imgData2" style="text-align: center;padding-top: 15px;">
                        <img @click="openDetail(item, item.testInfo)" :src="baseUrl + item.img"
                            style="width: 36px;height: 36px;border-radius: 50%;" />
                        <div style="text-align: center;;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
                            <span @click="openDetail(item, item.testInfo)">{{ item.username }}</span>
                        </div>
                        <div style="display: flex;justify-content: center;align-items: center;">
                            <a-button type="link" size="small" disabled>等待回复</a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 style="margin-top: 25px;">我的好友列表：</h3>
        <a-table :columns="columns2" :data-source="tableData2" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'username'">
                    <a @click="openDetail(record)">{{ record.username }}</a>
                </template>
                <template v-if="column.key === 'img'">
                    <img style="width: 32px;height: 32px;border-radius: 50%;" :src="record.imgUrl" />
                </template>
                <template v-if="column.key === 'tagObj'">
                    <a-tag v-for="item in record.tagObj"
                        style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;" :color="item.color">{{
                            item.name }}</a-tag>
                </template>
                <template v-if="column.key === 'online'">
                    <a-tag style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;"
                        :color="record.online ? '#87d068' : '#F44336'">{{
                            record.online ? "在线" : "离线" }}</a-tag>
                </template>

                <template v-if="column.key === 'msgCount'">
                    <a-badge :count="record.msgCount" />
                </template>
                <template v-if="column.key === 'action'">
                    <span
                        style="display: flex;justify-content: center;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button type="link" size="small" @click="goChat(record)">私聊</a-button>
                        <a-divider type="vertical" />
                        <a-popconfirm title="确定删除该好友吗?" ok-text="确定" cancel-text="取消" @confirm="deleteOk(record)">
                            <a-button type="link" danger size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="visible" destroyOnClose title="用户详情" :maskClosable="false">
            <a-form style="width: 100%;" :model="detailData" name="basic" :label-col="{ span: 4 }" autocomplete="off">
                <a-form-item label="账号">
                    <a-input readonly v-model:value="detailData.email"></a-input>
                </a-form-item>
                <a-form-item label="用户名">
                    <a-input readonly v-model:value="detailData.username" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="头像">
                    <div style="position: relative;width: 36px; height: 36px; border-radius: 50%; overflow: hidden;">
                        <img class="headImg" :src="detailData.img ? detailData.img : BaseImg"
                            style="width: 36px;height: 36px;" />
                    </div>
                </a-form-item>
                <a-form-item label="标签">
                    <a-tag v-for="item in detailData.tagObj"
                        style="min-width: 80px;text-align: center;margin-top: 3px;padding:1px;color: #ffffff;"
                        :color="item.color">{{
                            item.name }}</a-tag>
                </a-form-item>
                <a-form-item v-if="testInfo" label="验证信息">
                    <a-textarea readonly v-model:value="testInfo" />
                </a-form-item>

            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">关闭</a-button>
            </template>
        </a-modal>
        <a-modal v-model:visible="visible2" destroyOnClose title="添加好友" :maskClosable="false">
            <a-form ref="addFriendRef" style="width: 100%;" :model="addFriendData" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
                <a-form-item label="验证信息" name="remark" :rules="[{ required: true, message: '请输入验证信息！', trigger: 'blur' }]">
                    <a-textarea v-model:value="addFriendData.remark" placeholder="我是..."></a-textarea>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible2 = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="addFirends">确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { message, Table as aTable } from "ant-design-vue";
import { onMounted, ref, onUnmounted, inject, reactive } from "vue";
import { getMyFriendList, deleteMyFriend, giveUpRelation, approvalFriends, createRelation, type CreateRelationType, type DeleteMyFriendType, type GiveUpRelationType, type ApprovalFriendsType, getRandomFriend, getInterestFriend, getAccurateFriend, getMyAskRequestList } from "@/api/platform";
import router from "@/router";

const BaseImg: any = new URL("@/assets/img/touxiang.jpg", import.meta.url)
const baseUrl = import.meta.env.VITE_APP_BASE_URL + 'headImg/'
const socket: any = inject('socket')
const ws = socket()
const id = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : ""
sessionStorage.setItem("friendId", "")
const addFriendRef = ref()
const loading = ref(false)
const nowId1 = ref(0)
const tableData = ref()
const timer = ref<any>()
const testInfo = ref("")
const visible = ref(false)
const visible2 = ref(false)
const columns = ref<any>([
    {
        title: "序号",
        dataIndex: "no",
        key: "no",
        align: "center",
        width: 70
    },
    {
        title: "用户名",
        dataIndex: "username",
        key: "username",
        align: "center",
        width: 120
    },
    {
        title: "标签",
        dataIndex: "tagObj",
        key: "tagObj",
        align: "center",
        width: 280
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 120
    }
])
const tableData2 = ref()
const columns2 = ref<any>([
    {
        title: "序号",
        dataIndex: "no",
        key: "no",
        align: "center",
        width: 70
    },
    {
        title: "用户名",
        dataIndex: "username",
        key: "username",
        align: "center",
        width: 160
    },
    {
        title: "头像",
        dataIndex: "img",
        key: "img",
        align: "center",
        width: 80
    },
    {
        title: "标签",
        dataIndex: "tagObj",
        key: "tagObj",
        align: "center",
        width: 280
    },
    {
        title: "在线状态",
        dataIndex: "online",
        key: "online",
        align: "center",
        width: 160
    },
    {
        title: "未读消息",
        dataIndex: "msgCount",
        key: "msgCount",
        align: "center",
        width: 120
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 180
    }
])
const detailData = reactive<any>({
    id: parseInt(id as string),
    username: "",
    tagObj: [],
    img: "",
    email: ""
})
const addFriendData = reactive<any>({
    id: undefined,
    remark: ""
})
const email = ref("")
const imgData1 = ref<any>([])
const imgData2 = ref<any>([])

function getList() {
    tableData.value = []
}

async function getList2() {
    try {
        const res = await getMyAskRequestList(parseInt(id as string))
        if (res.data.code === 200) {
            imgData1.value = res.data.data1.reverse()
            imgData2.value = res.data.data2.reverse()
        }
    } catch (_) { }
}

async function getList3() {
    try {
        const res = await getMyFriendList(parseInt(id as string))
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
                res.data.rows[i - 1].imgUrl = baseUrl + res.data.rows[i - 1].img
            }
            tableData2.value = res.data.rows
        }
    } catch (_) { }
}

async function deleteOk(record: any) {
    const params: DeleteMyFriendType = {
        userId: id ? parseInt(id) : undefined,
        friendId: parseInt(record.id)
    }
    const res = await deleteMyFriend(params)
    if (res.data.code === 200) {
        message.success("删除成功")
        getList3()
    }
}

async function addFirends() {
    loading.value = true
    try {
        await addFriendRef.value?.validate()
        const params: ApprovalFriendsType = {
            id: id ? parseInt(id) : 0,
            friendId: addFriendData.id,
            remark: addFriendData.remark
        }
        const res = await approvalFriends(params)
        if (res.data.code === 200) {
            visible2.value = false
            getList()
            getList2()
            getList3()
        }
    } catch (_) { }
    loading.value = false
}

async function okFirends(friendId: any) {
    nowId1.value = friendId
    const params: CreateRelationType = {
        id: id ? parseInt(id) : 0,
        friendId: friendId
    }
    const res = await createRelation(params)
    if (res.data.code === 200) {
        getList2()
        getList3()
    }
    nowId1.value = 0
}

async function noFirends(friendId: any) {
    nowId1.value = friendId
    const params: GiveUpRelationType = {
        id: id ? parseInt(id) : 0,
        friendId: friendId
    }
    const res = await giveUpRelation(params)
    if (res.data.code === 200) {
        getList2()
        getList3()
    }
    nowId1.value = 0
}

function openDetail(record: any, info?: string) {
    visible.value = true
    if (info) {
        testInfo.value = info
    } else {
        testInfo.value = ""
    }
    detailData.id = record.id
    detailData.username = record.username
    detailData.img = baseUrl + record.img
    detailData.email = record.email
    detailData.tagObj = record.tagObj
}

async function randomMatching() {
    try {
        const res = await getRandomFriend(parseInt(id as string))
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
            }
            tableData.value = res.data.rows
            if (tableData.value.length == 0) {
                message.error("暂无可匹配好友！")
            }
        }
    } catch (_) { }
}

async function interestMatching() {
    try {
        const res = await getInterestFriend(parseInt(id as string))
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
            }
            tableData.value = res.data.rows
            if (tableData.value.length == 0) {
                message.error("暂无可匹配好友！")
            }
        }
    } catch (_) { }
}

async function emailSearch() {
    if (email.value == "") {
        return false
    }
    try {
        const res = await getAccurateFriend(parseInt(id as string), email.value)
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
            }
            tableData.value = res.data.rows
        } else if (res.data.code === 500) {
            message.error(res.data.msg)
        }
    } catch (_) { }
}

function reset() {
    email.value = ""
    getList()
}

function goChat(record: any) {
    sessionStorage.setItem("friendId", record.id)
    router.push("/chat")
}

function showAddFriend(id: number) {
    visible2.value = true
    addFriendData.id = id
    addFriendData.remark = ""
}

function updateListAll() {
    getList2()
    getList3()
}

onMounted(() => {
    setTimeout(() => {
        if (id) {
            const msg = {
                code: "update",
                id: id
            }
            ws.send(JSON.stringify(msg))
        }
    }, 500)
    getList()
    updateListAll()
    ws.onmessage = ({ data }: any) => {

    }
    timer.value = setInterval(() => {
        updateListAll()
    }, 2000)
})

onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
})

</script>
<style lang="less" scoped>
.userManage {
    padding: 24px;

    .searchHead {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .pagination {
        text-align: right;
        margin-top: 20px;
    }
}

:deep(.ant-table-placeholder) {
    height: 100px;

}

:deep(.ant-empty) {
    display: none;
}

:deep(::-webkit-scrollbar) {
    width: 6px;
    height: 6px;
}

:deep(::-webkit-scrollbar-track) {
    background-color: #f3f3f3;
}

:deep(::-webkit-scrollbar-thumb) {
    background-color: #bcbcbc;
}

:deep(::-webkit-scrollbar-thumb:hover) {
    background-color: #bcbcbc;
}

:deep(::-webkit-scrollbar-thumb:active) {
    background-color: #bcbcbc;
}
</style>