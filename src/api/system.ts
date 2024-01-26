import request from "../utils/request"


// 获取用户列表
export interface GetUserListType {
    page?: number
    size?: number
    username?: string
}
export function getUserList(data: GetUserListType) {
    return request({
        url: '/user',
        method: 'get',
        params: data
    })
}

// 获取用户详情
export function getUserDetail(id: number) {
    return request({
        url: '/user/' + id,
        method: 'get'
    })
}

// 修改用户信息
export interface EditUserType {
    id: number
    username: string
    img?: any
    tag: number[]
    password?: string | null
}
export function editUser(data: EditUserType) {
    return request({
        url: '/user',
        method: 'put',
        data: data
    })
}

// 删除用户
export function deleteUser(id: string) {
    return request({
        url: '/user/' + id,
        method: 'delete'
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
        url: '/tag',
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
        url: '/tag',
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
        url: '/tag',
        method: 'put',
        data: data
    })
}

// 删除标签
export function deleteTag(id: string) {
    return request({
        url: '/tag/' + id,
        method: 'delete'
    })
}

// 获取标签下拉框
export function getTagSelect() {
    return request({
        url: '/tagSelect',
        method: 'get'
    })
}