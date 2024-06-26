import { createApp } from 'vue'
import App from './App.vue'
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

app.use(router).use(ElementPlus).mount('#app')