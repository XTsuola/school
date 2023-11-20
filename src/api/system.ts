import request from "../utils/request"

// 获取用户列表
export interface GetUserType {
    page?: number
    size?: number
    email?: string
    username?: string
}
export function getUserList(data: GetUserType) {
    return request({
        url: '/users/',
        method: 'get',
        params: data
    })
}