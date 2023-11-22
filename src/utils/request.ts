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
service.interceptors.response.use((res) => {
  return res;
}, (error) => {
  if (isShowMsg) {
    if (error.response && error.response.status) {
      if (isShowMsg && (error.response.status === 403 || error.response.status === 401)) {
        message.error("身份过期");
        sessionStorage.clear();
        localStorage.clear();
        router.push({ path: "/login" });
      } else if (error.response.status === 404) {
        message.error("资源未找到");
      } else if (error.response.status === 500) {
        message.error("服务器错误");
      } else if (error.response.status === 400) {
        message.error(valueError(error.response.data));
      } else if (error.response.status === 413) {
        message.error(valueError(error.response.data));
      }
    } else {
      message.error("响应超时");
    }
  }
  isShowMsg = false;
  setTimeout(() => {
    isShowMsg = true;
  }, 600);
});

export default service;
