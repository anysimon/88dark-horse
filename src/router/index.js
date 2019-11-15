import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import layout from '@/views/layout/index.vue'
import Main from '@/views/home/main/main.vue'
import Publish from '@/views/home/publish/publish.vue'
import Article from '@/views/home/article/article.vue'
import Comment from '@/views/home/comment/comment.vue'
import Account from '@/views/home/account/account.vue'
import Image from '@/views/home/image/image.vue'
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
        path: '/article',
        component: Article
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/account',
        component: Account
      },
      {
        path: '/image',
        component: Image
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
