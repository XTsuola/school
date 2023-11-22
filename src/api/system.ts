import request from "../utils/request"


// 获取用户列表
export interface GetUserListType {
    page?: number
    size?: number
    username?: string
}
export function getUserList(data: GetUserListType) {
    return request({
        url: '/getUserList/',
        method: 'get',
        params: data
    })
}

// 获取用户详情
export function getUserDetail(id: number) {
    return request({
        url: '/getUserDetail/',
        method: 'get',
        params: { id: id }
    })
}

// 获取标签列表
export interface GetTagListType {
    page?: number
    size?: number
    name?: string
}
export function getTagList(data: GetTagListType) {
    return request({
        url: '/getTagList/',
        method: 'get',
        params: data
    })
}

// 新增标签
export interface AddTagType {
    name: string
    color: string | undefined
}
export function addTag(data: AddTagType) {
    return request({
        url: '/addTag',
        method: 'post',
        data: data
    })
}

// 修改标签
export interface EditTagType extends AddTagType {
    _id?: string
    id?: number
}
export function editTag(data: EditTagType) {
    return request({
        url: '/editTag',
        method: 'post',
        data: data
    })
}

// 删除标签
export function deleteTag(id: string) {
    return request({
        url: '/deleteTag?_id=' + id,
        method: 'get'
    })
}