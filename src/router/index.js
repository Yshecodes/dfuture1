import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppView from '../views/AppView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, //option 1
    },
    {
      path: '/appView',
      name: 'appView',
      component: AppView,
    },
    {
      path: '/aboutView',
      name: 'aboutView',
      component: () => import('../views/AboutView.vue'), //option 2
    },
  ],
})

export default router
