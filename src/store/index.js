// 从 vuex 模块 导入 创建仓库的方法
// import { createStore } from 'vuex'
import login from "@/store/modules/login";
import music from "@/store/modules/music";

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)


// 创建 总仓库 并且导出
// export default createStore({
const store = new Vuex.Store({
    // 各组件实例的data 迁移到这儿
    state: {
        music,
    },
    // 各组件实例的(同步)方法 迁移到这儿
    mutations: {
    },
    // 各组件实例的(异步)方法 迁移到这儿
    actions: {
        /**
         * Error: [vuex] actions should be function or object with "handler" function but
         */
        // music,
    },
    // 总仓库 不实现任何状态管理 (没有 state mutations actions)         只合并子仓库
    modules: {
        login,
        music,
    },
    getters
})

export default store
