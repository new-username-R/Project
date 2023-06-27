// 导入VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../components/login/Login.vue')
        },
        {
            path: '/resgin',
            name: 'resgin',
            component: () => import('../components/resgin/Resgin.vue')
        },
        {
            path: '/home',
            component: () => import('../views/Appear.vue'),
            children: [
                {
                    path: "/",
                    name: "homes",
                    component: () => import('../home/Home.vue')
                },
                {
                    path: '/list',
                    name: "list",
                    component: () => import('../views/users/List.vue')
                },
                {
                    path: '/manage',
                    name: "manage",
                    component: () => import('../views/manage/Manage.vue')
                },
                {
                    path: "/thing",
                    name: "thing",
                    component: () => import('../views/storage/Thing.vue')
                },
                {
                    path: "/stores",
                    name: "stores",
                    component: () => import('../views/storage/Stores.vue')
                },
                {
                    path: "/nums",
                    name: "nums",
                    component: () => import('../views/storage/Nums.vue')
                },
                {
                    path: "/page1",
                    name: "page1",
                    component: () => import('../views/datas/Page1.vue')
                },
                {
                    path: "/user",
                    name: "user",
                    component: () => import('../views/users/User.vue')
                }
            ]
        }
    ]
})
export default router