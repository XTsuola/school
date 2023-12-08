import request from "../utils/request"

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

// 获取一个随机好友
export function getRandomFriend(id: number | undefined) {
    return request({
        url: '/getRandomFriend/',
        method: 'get',
        params: { id: id }
    })
}

// 获取一个相同兴趣好友
export function getInterestFriend(id: number | undefined) {
    return request({
        url: '/getInterestFriend/',
        method: 'get',
        params: { id: id }
    })
}

//根据账号获取用户
export function getAccurateFriend(id: number | undefined, email: string) {
    return request({
        url: '/getAccurateFriend/',
        method: 'get',
        params: { id: id, email: email }
    })
}

// 我的申请以及回复表
export function getMyAskRequestList(id: number | undefined) {
    return request({
        url: '/getMyAskRequestList/',
        method: 'get',
        params: { id: id}
    })
}