import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import AdsView from "@/views/AdsView.vue";
import FavouritesView from "@/views/FavouritesView.vue";
import MusicView from "@/views/MusicView.vue";
import MusicCategoriesView from "@/views/MusicCategoriesView.vue";
import UsersView from "@/views/UsersView.vue";


const routes= [
    {
        path: '/',
        name: '登录',
        component: LoginView
    },
    {
        path: '/home',
        name: '首页',
        component: HomeView
    },
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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes  // 定义地址和页面的映射
})



export default router
