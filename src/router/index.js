import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import AdsView from "@/views/AdsView.vue";
import FavouritesView from "@/views/FavouritesView.vue";
import MusicView from "@/views/MusicView.vue";
import MusicCategoriesView from "@/views/MusicCategoriesView.vue";
import UsersView from "@/views/UsersView.vue";
import RegisterView from "@/views/RegisterView.vue";


const routes= [
    {
        path: '/',
        name: '登录',
        component: LoginView
    },
    {
        path: '/register',
        name: '注册',
        component: RegisterView,
        meta : {
            needLogin : false
        }
    },
    {
        path: '/home',
        name: '首页',
        component: HomeView,
        meta : {
            needLogin : false
        }
    },
    {
        path: '/ads',
        name: 'AdsView',
        component: AdsView,
        meta : {
            needLogin : false
        }
    },
    {
        path: '/favourites',
        name: 'FavouritesView',
        component: FavouritesView,
        meta : {
            needLogin : true
        }
    },
    {
        path: '/music',
        name: 'MusicView',
        component: MusicView,
        meta : {
            needLogin : false
        }
    },
    {
        path: '/musicCategories',
        name: 'MusicCategoriesView',
        component: MusicCategoriesView,
        meta : {
            needLogin : false
        }
    },
    {
        path: '/users',
        name: 'UsersView',
        component: UsersView,
        meta : {
            needLogin : true
        }
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes  // 定义地址和页面的映射
})

// 路由守卫方法
router.beforeEach( (to,from,next)=>{

    // 判断路由定向的目标 是否需要登录才能访问
    if( to.meta.needLogin ) {
        // 当前 路由定向的目标 是需要登录才能访问
        if( localStorage.getItem("token") == null ) {
            // 当前用户未登录
            alert("您未登录，请先登录!")
            // 路由拦截 重定向到登陆页面
            next( { name : "登录" } )
        }
    }
    // 路由放行
    next()
})



export default router
