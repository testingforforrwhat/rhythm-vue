import {createRouter, createWebHistory} from 'vue-router'
import musicCayegories from '@/views/musicCategories/musicCategoriesList.vue'


const routes= [
    {
        path: '/',
        name: 'musicCayegories',
        component: musicCayegories
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    /*这个地方就定义了地址和页面之间的映射关系
    * 即如果浏览器地址栏是 / 则展示 HomeView 这个页面
    * 如果浏览器地址栏是 /about，则展示 AboutView 这个页面
    * */
    routes
})



export default router
