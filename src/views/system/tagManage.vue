<template>
    <div class="tagManage">
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item style="margin-right: 20px;">
                <a-button type="primary" @click="showModal(1)">添加标签</a-button>
            </a-form-item>
            <a-form-item label="标签名称">
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
                <template v-if="column.key === 'name'">
                    <a-tag style="margin-left: 2px;padding:1px;color: #ffffff;min-width: 80px;" :color="record.color">{{
                        record.name }}</a-tag>
                </template>
                <template v-if="column.key === 'action'">
                    <span
                        style="display: flex;justify-content: center;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <span style="cursor: pointer;" @click="showModal(2, record)">
                            <a-button type="link" size="small">修改</a-button>
                        </span>
                        <a-divider type="vertical" />
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
                <a-form-item label="标签颜色" name="color" :rules="[{ required: true, message: '请选择标签颜色!' }]">
                    <a-input style="width: 100px;" type="color" v-model:value="addData.color"></a-input>
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
import { onMounted, reactive, ref } from "vue";
import { formatDate, getUpdateParams, valueError } from "@/utils/fuc";
import { getTagList, type AddTagType, type GetTagListType, addTag, editTag, deleteTag, type EditTagType } from "@/api/system";

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
        title: "分类名称",
        dataIndex: "name",
        key: "name",
        align: "center",
        width: 240
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
    color: "#cccccc"
})

async function getList() {
    tableLoading.value = true
    const params: GetTagListType = {
        page: currentPage.value,
        size: pageSize.value,
        name: formState.name
    }
    try {
        const res = await getTagList(params)
        if (res.data.code === 200) {
            total.value = res.data.total
            for (let i = 1; i <= res.data.rows.length; i++) {
                res.data.rows[i - 1].no = (currentPage.value - 1) * pageSize.value + i
            }
            tableData.value = res.data.rows
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
        addData._id = addData.name = ""
        addData.color = "#cccccc"
    } else if (type === 2 && record) {
        visible.value = true
        title.value = "修改标签"
        addData.id = record.id
        addData._id = record._id
        addData.name = record.name
        addData.color = record.color
    }
}

async function handleOk() {
    loading.value = true
    if (title.value === "添加标签") {
        try {
            await tagRef.value?.validate()
            const params: AddTagType = {
                name: addData.name,
                color: addData.color
            }
            const res = await addTag(params)
            if (res.status === 200) {
                message.success("新增成功")
                visible.value = false
                getList()
            } else {
                message.error("操作失败")
            }
        } catch (_) { }
    } else if (title.value === "修改标签") {
        try {
            await tagRef.value?.validate()
            const params: EditTagType = {
                _id: addData._id,
                id: addData.id,
                name: addData.name,
                color: addData.color
            }
            const res = await editTag(params)
            if (res.status === 200) {
                message.success("修改成功")
                visible.value = false
                getList()
            } else {
                message.error("操作失败")
            }
        } catch (_) { }
    }
    loading.value = false
}

async function deleteOk(record: any) {
    const res = await deleteTag(record._id)
    if (res.status === 200) {
        message.success("删除成功")
        getList()
    } else {
        message.error("删除失败")
    }
}

onMounted(() => {
    getList()
})

</script>
<style lang="less" scoped>
.tagManage {
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