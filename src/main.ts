import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue';
import dayjs from'dayjs';
import 'dayjs/locale/zh-cn'
import 'ant-design-vue/dist/antd.css';
import socket from './utils/webscoket'

dayjs.locale('zh-cn')

const app = createApp(App)
app.provide('socket', socket)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(Antd)
app.use(router)
app.mount('#app')
