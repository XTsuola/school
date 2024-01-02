import request from "../utils/request"

// 注册
export function registerUser(data: any) {
    return request({
        url: '/register_user',
        method: 'post',
        data: data
    })
}

// 登录
export interface LoginParams {
    email: string
    password: string
}
export function login(data: LoginParams) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

// 修改密码
export function updatePassword(data: any) {
    return request({
        url: '/user/modify_password',
        method: 'post',
        data: data
    })
}
