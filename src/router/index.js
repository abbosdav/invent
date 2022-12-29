import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta:{layout: 'main'},
    component: HomeView
  },

  {
    path: '/:id',
    name: 'page',
    meta:{layout: 'main'},
    component: () => import('../views/PageView.vue')
  },

  {
    path: '/login',
    name: 'login',
    meta:{layout: 'empty'},
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta:{layout: 'main'},
    component: () => import('../views/settings/SettingsView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
