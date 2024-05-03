// 从 vuex 模块 导入 创建仓库的方法
import { createStore } from 'vuex'

// 创建 总仓库 并且导出
export default createStore({
    // 各组件实例的data 迁移到这儿
    state: {
    },
    // 各组件实例的(同步)方法 迁移到这儿
    mutations: {
    },
    // 各组件实例的(异步)方法 迁移到这儿
    actions: {
    },
    modules: {
    }
})