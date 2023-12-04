import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

//定义路由配置，以及对应的组件/页面
const routes = [
  {
    path: '/',
    name: 'mainPage',
    title: 'main页',
    component: () => import("@/pages/main/index.vue"),
  },
  {
    path: '/home',
    name: 'homePage',
    title: 'home页',
    component: () => import("@/pages/home/index.vue"),
  },
]

//创建路由实例，还有一些额外的参数可以传递，后续可做补充
//如beforeEnter、beforeRouterLeave....等
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
