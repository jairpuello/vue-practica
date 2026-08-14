import { createRouter, createWebHistory } from 'vue-router'
import MainView from './views/MainView.vue'

const router = createRouter({
  history: createWebHistory('/vue-pinia/'),
  routes: [
    {
      path: '/',
      redirect: '/principal'
    },
    {
      path: '/principal',
      name: 'main',
      component: MainView
    }
  ]
})

export default router
