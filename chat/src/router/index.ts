import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
    createWebHistory,
    RouteLocationNormalized,
    NavigationGuardNext,
    Router
} from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../pages/Login"),
    },
    {
        path: "/list",
        name: "List",
        component: () => import("../pages/List"),
    },
    {
        path: "/chat",
        name: "Chat",
        component: () => import("../pages/Chat"),
    },
    {
        path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
        name: '404',
        component: () => import('../pages/404')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;