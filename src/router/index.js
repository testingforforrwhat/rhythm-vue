import {createRouter, createWebHistory} from 'vue-router'
import musicCayegories from '@/views/musicCategories/musicCategoriesList.vue'


const routes= [
    {
        path: '/',
        name: '登录',
        component: musicCayegories
    },
    {
        path: '/home',
        name: '首页',
        component: HomeView,
        children: [
            {
                path: '/ads',
                name: 'AdsView',
                component: AdsView
            },
            {
                path: '/favourites',
                name: 'FavouritesView',
                component: FavouritesView
            },
            {
                path: '/music',
                name: 'MusicView',
                component: MusicView
            },
            {
                path: '/musicCategories',
                name: 'MusicCategoriesView',
                component: MusicCategoriesView
            },
            {
                path: '/users',
                name: 'UsersView',
                component: UsersView
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes  // 定义地址和页面的映射
})



export default router
