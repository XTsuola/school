import request from "../utils/request"

// 获取用户请求好友列表
export function getAskList(id: any) {
    return request({
        url: '/getAskList/',
        method: 'get',
        params: { userId: id }
    })
}

// 获取我的好友列表
export function getMyFriendList(id: any) {
    return request({
        url: '/getMyFriendList/',
        method: 'get',
        params: { userId: id }
    })
}

// 删除我的好友
export interface DeleteMyFriendType {
    userId: number | undefined
    friendId: number | undefined
}
export function deleteMyFriend(data: DeleteMyFriendType) {
    return request({
        url: '/deleteMyFriend/',
        method: 'get',
        params: data
    })
}

// 新增好有申请
export interface ApprovalFriendsType {
    id: number
    friendId: number
    remark: string
}
export function approvalFriends(data: ApprovalFriendsType) {
    return request({
        url: '/approvalFriends',
        method: 'post',
        data: data
    })
}

// 创建好有关系
export interface CreateRelationType {
    id: number
    friendId: number
}
export function createRelation(data: CreateRelationType) {
    return request({
        url: '/createRelation',
        method: 'post',
        data: data
    })
}

// 创建好有关系
export interface GiveUpRelationType {
    id: number
    friendId: number
}
export function giveUpRelation(data: GiveUpRelationType) {
    return request({
        url: '/giveUpRelation',
        method: 'post',
        data: data
    })
}

// 获取我的好友列表
export function getInfoMsg(data: GiveUpRelationType) {
    return request({
        url: '/getInfoMsg/',
        method: 'get',
        params: data
    })
}

// 获取我的好友信息
export function getMyFriendInfo(id: number | undefined) {
    return request({
        url: '/getMyFriendInfo/',
        method: 'get',
        params: { id: id }
    })
}

// 修改消息读取状态
export function editMessage(id: number, friendId: number) {
    return request({
        url: '/editMessage',
        method: 'post',
        data: {
            id: id,
            friendId: friendId
        }
    })
}