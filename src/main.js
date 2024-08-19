import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store";  // 导入我们创建的 store
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
// 在你的 Vue 实例中导入并使用 Vuex Store
// 在组件中，你可以通过 this.$store 来访问 Vuex Store，并通过相应的方法来读取状态、提交突变或者发起动作。
/**
 * this.$store.state.count  - data()
 * this.$store.commit('increment')  - methods:
 * this.$store.dispatch('incrementAsync')  - methods:
 * this.$store.getters  - computed:
 */
app.use(store).use(router).use(ElementPlus).mount('#app')
