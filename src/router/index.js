import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Media from '../views/Media.vue'

const routes = [
  {
    path: '/',
    name: 'News',
    component: News
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/media',
    name: 'Media',
    component: () => import('../views/Media.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/Service.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
