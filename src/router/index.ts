import { createRouter, createWebHashHistory } from "vue-router";
import routerData from "./routerData";
import Login from '../views/login/index.vue'
import { getMenuData } from "@/utils/fuc";

const routeList = [{
  path: "/",
  redirect: "/home",
  name: "basicLayout",
  component: () => import("@/layout/BasicLayout.vue"),
  children: []
}, {
  path: "/login",
  name: "login",
  component: Login
}, {
  path: "/register",
  name: "register",
  component: Login
}, {
  path: "/forget",
  name: "forget",
  component: Login
}/* , {
  path: "/preview",
  name: "preview",
  component: Preview
} */]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routeList
})

const whiteList = ["/login", "/register", "/forget"]

function addRoute(parentName: string, data: any) {
  data.forEach((item: any) => {
    if (item.path && (item.meta.isShow || item.meta.isHome || item.meta.isAddPage)) {
      router.addRoute(parentName, {
        path: item.path,
        name: item.meta.label,
        component: item.component,
        meta: {
          key: item.meta.key,
          label: item.meta.label,
          icon: item.meta.icon
        }
      })
    }
    if (Array.isArray(item.children) && item.children.length > 0 && item.meta.isShow) {
      addRoute(item.meta.label, item.children)
    }
  })
}

const id = sessionStorage.getItem("userId")
const res = getMenuData(id, routerData)
addRoute("basicLayout", res)

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token")
  if (whiteList.find(item => item === to.fullPath)) {
    if (token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (from.fullPath === "/login") {
      const id = sessionStorage.getItem("userId")
      const res = getMenuData(id, routerData)
      addRoute("basicLayout", res)
    }
    if ((from.fullPath === "/exam/paperDetail" && to.fullPath === "/exam/paperSettingManage") || (from.fullPath === "/exam/paperEdit" && to.fullPath === "/exam/paperSettingManage") || (from.fullPath === "/exam/paperAdd" && to.fullPath === "/exam/paperSettingManage")) {
      sessionStorage.setItem("getPage", "true")
    } else {
      sessionStorage.setItem("getPage", "false")
    }
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

export default router