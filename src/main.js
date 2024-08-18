import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store";
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入所有图标并全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 导入所有图标并全局注册
// https://element-plus.org/zh-CN/component/icon.html
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 视图 挂载 模型数据
app.use(store).use(router).use(ElementPlus).mount('#app')
