<template>
    <div class="chat">
        <ul ref="myUlRef">
            <li v-for="item in infoData">
                <div v-if="item.id == id" class="myMsg">
                    <div class="title">{{ username + "-" + formatDate(item.time) }}</div>
                    <div class="msg">{{ item.msg }}</div>
                    <img :src="item.id == id ? myImg : friendImg" />
                </div>
                <div v-else class="friendMsg">
                    <div class="title">{{ friendName + "-" + formatDate(item.time) }}</div>
                    <div class="msg">{{ item.msg }}</div>
                    <img :src="item.id == id ? myImg : friendImg" />

                </div>
            </li>
        </ul>
        <div class="sendMsg">
            <div class="btn_input">
                <textarea v-model="txt"></textarea>
            </div>
            <div class="btn_action">
                <a-button class="btn" @click="goBack()">关闭</a-button>
                <a-popover :overlay-inner-style="{ padding: 0 }">
                    <template #content>
                        <div class="biaoqing">
                            <div class="biaoqing_ul">
                                <div v-for="item in appData.slice(0, 10)" class="biaoqing_li">
                                    <span class="biaoqing_li_item" @click="txt += item.char">{{ item.char }}</span>
                                </div>
                            </div>
                            <div class="biaoqing_ul">
                                <div v-for="item in appData.slice(10, 20)" class="biaoqing_li">
                                    <span class="biaoqing_li_item" @click="txt += item.char">{{ item.char }}</span>
                                </div>
                            </div>
                            <div class="biaoqing_ul">
                                <div v-for="item in appData.slice(20, 30)" class="biaoqing_li">
                                    <span class="biaoqing_li_item" @click="txt += item.char">{{ item.char }}</span>
                                </div>
                            </div>
                            <div class="biaoqing_ul">
                                <div v-for="item in appData.slice(30, 40)" class="biaoqing_li">
                                    <span class="biaoqing_li_item" @click="txt += item.char">{{ item.char }}</span>
                                </div>
                            </div>
                            <div class="biaoqing_ul">
                                <div v-for="item in appData.slice(40, 50)" class="biaoqing_li">
                                    <span class="biaoqing_li_item" @click="txt += item.char">{{ item.char }}</span>
                                </div>
                            </div>
                        </div>

                    </template>
                    <a-button class="btn">表情包</a-button>
                </a-popover>
                <a-button class="btn" :type="txt.length > 0 ? 'primary' : ''" @click="sendMessage()">发送</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { editMessage, getInfoMsg, getMyFriendInfo, type GiveUpRelationType } from '@/api/platform';
import router from '@/router';
import { inject, onMounted, ref } from 'vue';
import { formatDate, appData } from '@/utils/fuc'
import { message } from 'ant-design-vue';

const socket: any = inject('socket')
const ws = socket()
const id = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : ""
const username = sessionStorage.getItem("username") ? sessionStorage.getItem("username") : ""
const friendId = sessionStorage.getItem("friendId") ? sessionStorage.getItem("friendId") : ""
const myImg = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + sessionStorage.getItem('img')
const friendName = ref("")
const txt = ref("")
const infoData = ref<any>([])
const myUlRef = ref()
let friendImg = ref("")

function sendMessage() {
    if (txt.value.length > 0) {
        let msg = {
            code: 'sendMessage',
            id: id ? parseInt(id) : 0,
            friendId: friendId ? parseInt(friendId) : 0,
            info: txt.value
        }
        ws.send(JSON.stringify(msg))
        txt.value = ""
    }

}

async function getInfoList() {
    const params: GiveUpRelationType = {
        id: id ? parseInt(id) : 0,
        friendId: friendId ? parseInt(friendId) : 0,
    }
    const res = await getInfoMsg(params)
    if (res.data.code == 200) {
        infoData.value = res.data.rows.info
        setTimeout(() => {
            myUlRef.value.scrollTop = 1000000
        }, 100)
    }
}

async function getMyFriend() {
    const res = await getMyFriendInfo(parseInt(friendId as string))
    if (res.data.code == 200) {
        friendName.value = res.data.rows.username
        friendImg.value = import.meta.env.VITE_APP_BASE_URL + 'headImg/' + res.data.rows.img
    }
}

async function editMsg() {
    await editMessage(parseInt(id as string), parseInt(friendId as string))
}

function goBack() {
    router.push("/home")
}

onMounted(() => {
    editMsg()
    myUlRef.value.scrollTop = parseInt(JSON.stringify(myUlRef.value.scrollHeight))
    getInfoList()
    getMyFriend()
    setTimeout(() => {
        if (id) {
            const msg = {
                code: "update",
                id: id
            }
            ws.send(JSON.stringify(msg))
        }
    }, 500)
    ws.onmessage = ({ data }: any) => {
        const info = JSON.parse(data)
        if (info.uid == "msgOk") {
            infoData.value = info.data
            editMsg()
            setTimeout(() => {
                myUlRef.value.scrollTop = 10000000
            }, 100)
        } else if(info.uid == "msgError") {
            message.error(info.data)
            router.push("/home")
        }
    }
})

</script>

<style lang="less" scoped>
.chat {
    width: 60%;
    height: 100%;
    margin-left: 17%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ul {
        background: #F5F5F5;
        height: 70%;
        width: 100%;
        border: 1px solid #ccc;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: #ccc 0px 0px 6px;
        overflow-y: auto;

        li {
            padding: 5px;

            .myMsg {
                position: relative;
                width: 100%;
                min-height: 60px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .title {
                    color: #9a9a9a;
                    width: calc(100% - 40px);
                    height: 20px;
                    margin-right: 40px;
                    text-align: right;
                }

                .msg {
                    margin-right: 40px;
                    background: #12B7F5;
                    color: #ffffff;
                }

                img {
                    position: absolute;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    right: 5px;
                    top: 5px;
                }
            }

            .friendMsg {
                position: relative;
                width: 100%;
                min-height: 60px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .title {
                    color: #9a9a9a;
                    width: calc(100% - 40px);
                    height: 20px;
                    margin-left: 40px;
                    text-align: left;
                }

                .msg {
                    margin-left: 40px;
                    background: #ffffff;
                }

                img {
                    position: absolute;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    left: 5px;
                    top: 5px;
                }
            }

            .msg {
                white-space: pre-wrap;
                word-break: break-all;
                word-wrap: break-word;
                overflow-y: auto;
                overflow-x: hidden;
                margin-top: 4px;
                max-width: 60%;
                padding: 6px;
                border-radius: 5px;
            }



        }
    }

    .sendMsg {
        height: 24%;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: #ccc 0px 0px 6px;

        .btn_input {
            padding: 15px;
            width: 100%;
            height: 80%;
            overflow-y: hidden;

        }

        .btn_action {
            height: 20%;
            text-align: right;

            .btn {
                height: 80%;
                margin-right: 10px;
            }
        }
    }
}

.biaoqing {
    .biaoqing_ul {
        width: 400px;
        display: flex;
        display: flex;

        .biaoqing_li {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            .biaoqing_li_item {
                padding: 2px;
                font-size: 20px;
                cursor: pointer;
            }

            .biaoqing_li_item:hover {
                background-color: #eeeeee;
            }
        }
    }
}


textarea {
    height: 100%;
    width: 100%;
    font-size: 18px;
    border: 0;
    outline: none;
    resize: none;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background-color: #f3f3f3;
}

::-webkit-scrollbar-thumb {
    background-color: #bcbcbc;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #bcbcbc;
}

::-webkit-scrollbar-thumb:active {
    background-color: #bcbcbc;
}
</style>