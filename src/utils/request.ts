import router from "@/router";
import { message } from "ant-design-vue";
import axios from "axios";
import { valueError } from "./fuc";

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // 超时
  timeout: 20000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token && config.headers) {
    config.headers.token = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

let isShowMsg = true;
// 响应拦截器
service.interceptors.response.use(res => {
  if (res.data.code == 401) {
      if (isShowMsg) {
          message.error(res.data.msg)
          sessionStorage.clear()
          router.push({ path: "/login" })
      }
      isShowMsg = false
      setTimeout(() => {
          isShowMsg = true
      }, 1500)
      return false
  } else {
      return res
  }
}, error => {
  return Promise.reject(error)
})


export default service;
