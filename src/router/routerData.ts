import BlankLayout from "@/layout/BlankLayout.vue"
import Home from "@/views/home.vue"
import TagManage from "@/views/system/tagManage.vue"
import UserManage from "@/views/system/userManage.vue"
import Chat from '../views/chat.vue'

const newRouterData: any = [
  {
    path: "home",
    meta: {
      menuType: "menu",
      key: "home",
      label: "高校智能交友平台",
      icon: "HomeOutlined",
      isHome: true,
      isOk: false
    },
    component: Home
  }, {
    path: "/chat",
    meta: {
      menuType: "menu",
      key: "chat",
      label: "实时私聊",
      icon: "HomeOutlined",
      isAddPage: true,
      isOk: false
    },
    component: Chat
  },
  {
    path: "system",
    meta: {
      menuType: "folder",
      key: "system",
      icon: "UserOutlined",
      label: "系统设置",
      isShow: true,
      isOk: true
    },
    component: BlankLayout,
    children: [
      {
        path: "userManage",
        meta: {
          menuType: "menu",
          key: "userManage",
          label: "用户管理",
          icon: "UnorderedListOutlined",
          isShow: true,
          isOk: true
        },
        component: UserManage
      },
      {
        path: "tagManage",
        meta: {
          menuType: "menu",
          key: "tagManage",
          label: "标签管理",
          icon: "UnorderedListOutlined",
          isShow: true,
          isOk: true
        },
        component: TagManage
      },
    ]
  },

]

export default newRouterData
