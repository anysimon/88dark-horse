import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import layout from '@/views/layout/index.vue'
import Main from '@/views/home/main/main.vue'
import Publish from '@/views/home/publish/publish.vue'
import Article from '@/views/home/article/article.vue'
import Comment from '@/views/home/comment/comment.vue'
import Account from '@/views/home/account/account.vue'
import Media from '../views/home/media'
import commentDetail from '@/views/home/comment-detail/comment-detail.vue'
// 引入nprogress
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  { // 一级路由
    path: '/',
    component: layout,
    children: [
      { // 二级路由为空  默认显示main页面
        path: '',
        component: Main
      },
      {
        path: '/publish',
        component: Publish
      },
      {
        path: '/publish/:articleId',
        component: Publish
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/comment/:articleId',
        component: commentDetail,
        props: true
      },
      {
        path: '/account',
        component: Account
      },
      {
        path: '/media',
        component: Media
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router

// 控制页面访问权限  Vue-router 导航守卫  beforeEach全局前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  // to 即将要进入的路由对象 地址  to.path 可以获取地址
  // from 当前导航正要离开的地址
  // next 放行
  if (to.path === '/login') {
    return next()
  }
  const token = window.localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
// afterEach 全局后置钩子
router.afterEach((to, from) => {
  NProgress.done()
})
