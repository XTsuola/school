<template>
    <div class="userManage">
        <h3>所有用户列表：</h3>
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'tagObj'">
                    <a-tag v-for="item in record.tagObj"
                        style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;" :color="item.color">{{
                            item.name }}</a-tag>
                </template>
                <template v-if="column.key === 'action'">
                    <span
                        style="display: flex;justify-content: center;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <span style="cursor: pointer;" @click="addFirends(record.id)">
                            <a-button type="link" size="small">添加好友</a-button>
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <h3 style="margin-top: 25px;">我的申请列表：</h3>
        <a-table :columns="columns2" :data-source="tableData2" :pagination="false" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'username'">
                    {{ record.requestor.username }}
                </template>
                <template v-if="column.key === 'img'">
                    <img style="width: 32px;height: 32px;border-radius: 50%;" :src="record.imgUrl" />
                </template>
                <template v-if="column.key === 'tagObj'">
                    <a-tag v-for="item in record.requestor.tag"
                        style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;" :color="item.color">{{
                            item.name }}</a-tag>
                </template>
                <template v-if="column.key === 'action'">
                    <span
                        style="display: flex;justify-content: center;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button :loading="record.requestor.id == nowId1" type="link" size="small"
                            @click="okFirends(record.requestor.id)">同意</a-button>
                        <a-divider type="vertical" />
                        <a-button :loading="record.requestor.id == nowId1" type="link" danger size="small"
                            @click="noFirends(record.requestor.id)">拒绝</a-button>
                    </span>
                </template>
            </template>
        </a-table>
        <h3 style="margin-top: 25px;">我的好友列表：</h3>
        <a-table :columns="columns3" :data-source="tableData3" bordered>
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
        <a-modal v-model:visible="visible" destroyOnClose title="好友详情" :maskClosable="false">
            <a-form ref="userInfoRef" style="width: 100%;" :model="detailData" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
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
                        style="min-width: 80px;text-align: center;margin-bottom: 5px;padding:1px;color: #ffffff;" :color="item.color">{{
                            item.name }}</a-tag>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">关闭</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { message, Table as aTable } from "ant-design-vue";
import { onMounted, ref, onUnmounted, inject, reactive } from "vue";
import { getUserList } from "@/api/system";
import { getAskList, getMyFriendList, deleteMyFriend, giveUpRelation, approvalFriends, createRelation, type CreateRelationType, type DeleteMyFriendType, type GiveUpRelationType, type ApprovalFriendsType } from "@/api/platform";
import router from "@/router";

const BaseImg: any = new URL("@/assets/img/touxiang.jpg", import.meta.url)
const socket: any = inject('socket')
const ws = socket()
const id = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : ""
sessionStorage.setItem("friendId", "")
const nowId1 = ref(0)
const tableData = ref()
const timer = ref<any>()
const visible = ref(false)
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
        width: 160
    },
    {
        title: "标签",
        dataIndex: "tagObj",
        key: "tagObj",
        align: "center",
        width: 320
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 240
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
        width: 240
    },
    {
        title: "备注",
        dataIndex: "askInfo",
        key: "askInfo",
        align: "center",
        width: 240
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 180
    }
])
const tableData3 = ref()
const columns3 = ref<any>([
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
        width: 300
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

async function getList() {
    try {
        const res = await getUserList({})
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
            }
            tableData.value = res.data.rows
        }
    } catch (_) { }
}

async function getList2() {
    try {
        const res = await getAskList(parseInt(id as string))
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
                res.data.rows[i - 1].imgUrl = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + res.data.rows[i - 1].requestor.img
            }
            tableData2.value = res.data.rows
        }
    } catch (_) { }
}

async function getList3() {
    try {
        const res = await getMyFriendList(parseInt(id as string))
        if (res.data.code === 200) {
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = i
                res.data.rows[i - 1].imgUrl = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + res.data.rows[i - 1].img
            }
            tableData3.value = res.data.rows
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

async function addFirends(friendId: any) {
    const params: ApprovalFriendsType = {
        id: id ? parseInt(id) : 0,
        friendId: friendId,
        remark: "可以交个朋友吗？"
    }
    const res = await approvalFriends(params)
    if (res.data.code === 200) {
        getList2()
        getList3()
    }
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

function openDetail(record: any) {
    visible.value = true
    detailData.id = record.id
    detailData.username = record.username
    detailData.img = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + record.img
    detailData.email = record.email
    detailData.tagObj = record.tagObj.concat(record.tagObj)
}

function goChat(record: any) {
    sessionStorage.setItem("friendId", record.id)
    router.push("/chat")
}

function updateListAll() {
    getList()
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
</style>