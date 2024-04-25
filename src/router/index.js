import {createRouter, createWebHistory} from 'vue-router'
import musicCayegories from '@/views/musicCategories/musicCategoriesList.vue'


const routes= [
    {
        path: '/',
        name: 'musicCayegories',
        component: musicCayegories
    },
    {
        path: '/home',
        name: '首页',
        component: HomeView,
        children: [
            {
                path: '/musicCayegories',
                name: 'musicCayegories',
                component: musicCayegories
            },
            {
                path: '/musicCayegories',
                name: 'musicCayegories',
                component: musicCayegories
            },
            {
                path: '/musicCayegories',
                name: 'musicCayegories',
                component: musicCayegories
            },
            {
                path: '/musicCayegories',
                name: 'musicCayegories',
                component: musicCayegories
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes  // 定义地址和页面的映射
})



export default router
