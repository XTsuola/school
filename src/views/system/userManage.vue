<template>
    <div class="userManage">
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="用户名">
                <a-input v-model:value="formState.name" placeholder="请输入" />
            </a-form-item>
            <a-form-item>
                <div style="display: flex;justify-content: flex-start;">
                    <a-button style="margin-right: 12px;" type="primary" @click="search">查询</a-button>
                    <a-button @click="reset">清空</a-button>
                </div>
            </a-form-item>
        </a-form>
        <a-table :columns="columns" :loading="tableLoading" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'tagObj'">
                    <a-tag v-for="item in record.tagObj"
                        style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;" :color="item.color">{{
                            item.name }}</a-tag>
                </template>
                <template v-if="column.key === 'online'">
                    <a-tag style="min-width: 80px;margin-left: 2px;padding:1px;color: #ffffff;"
                        :color="record.online == 1 ? '#87d068' : '#F44336'">{{ record.online == 1 ? "在线" : "离线"
                        }}</a-tag>
                </template>
                <template v-if="column.key === 'action'">
                    <span
                        style="display: flex;justify-content: center;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-popconfirm title="确定删除该数据吗?" ok-text="确定" cancel-text="取消" @confirm="deleteOk(record)">
                            <a-button type="link" danger size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="currentPage" v-model:page-size="pageSize"
            :pageSizeOptions="['10', '15', '20', '50', '100']" :total="total"
            :show-total="(total: number) => `共 ${total} 条`" @change="getList" />
        <a-modal v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
            <a-form ref="tagRef" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
                <a-form-item label="标签名称" name="name" :rules="[{ required: true, message: '请输入标签名称!' }]">
                    <a-input v-model:value="addData.name" placeholder="请输入"></a-input>
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
import { message, Table as aTable } from "ant-design-vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { formatDate, getUpdateParams, valueError } from "@/utils/fuc";
import { getUserList, type GetUserListType, type EditTagType, deleteUser } from "@/api/system";

const currentPage = ref(1)
const pageSize = ref(15)
const total = ref(0)
const formState = reactive({
    name: ""
})
const tableData = ref()
const tableLoading = ref(false)
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
        title: "账号",
        dataIndex: "email",
        key: "email",
        align: "center",
        width: 160
    },
    {
        title: "标签",
        dataIndex: "tagObj",
        key: "tagObj",
        align: "center",
        width: 400
    },
    {
        title: "在线状态",
        dataIndex: "online",
        key: "online",
        align: "center",
        width: 160
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 160
    }
])
const loading = ref(false)
const tagRef = ref()
const visible = ref(false)
const title = ref("添加标签")
const addData = reactive<EditTagType>({
    _id: "",
    id: undefined,
    name: "",
    color: ""
})

async function getList() {
    tableLoading.value = true
    const params: GetUserListType = {
        page: currentPage.value,
        size: pageSize.value,
        username: formState.name
    }
    try {
        const res = await getUserList(params)
        if (res.data.code === 200) {
            total.value = res.data.data.total
            for (let i = 1; i <= res.data.data.rows.length; i++) {
                res.data.data.rows[i - 1].no = (currentPage.value - 1) * pageSize.value + i
            }
            tableData.value = res.data.data.rows
        }
        
    } catch (_) { }

    tableLoading.value = false
}

function search() {
    currentPage.value = 1
    getList()
}

function reset() {
    formState.name = ""
    search()
}

function showModal(type: number, record?: any) {
    if (type === 1) {
        visible.value = true
        title.value = "添加标签"
        addData.id = undefined
        addData._id = ""
        addData.name = ""
    } else if (type === 2 && record) {
        visible.value = true
        title.value = "修改标签"
        addData.id = record.id
        addData._id = record._id
        addData.name = record.name
    }
}

async function handleOk() {
    loading.value = true

    loading.value = false
}

async function deleteOk(record: any) {
    if (record.id === 1) {
        message.error("管理员账号不可被删除！")
        return false
    }
    const res = await deleteUser(record.id)
    if (res.status === 200) {
        message.success("删除成功")
        getList()
    } else {
        message.error("删除失败")
    }
}

const timer = ref<any>()

onMounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
    getList()
    // timer.value = setInterval(() => {
    //     getList()
    // }, 3000)
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