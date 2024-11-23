import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearnView from '../views/LearnView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, //option 1
    },
    {
      path: '/learn',
      name: 'learn',
      component: LearnView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'), //option 2
    },
  ],
})

export default router
