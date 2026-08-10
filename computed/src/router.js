import { createRouter, createWebHistory } from 'vue-router'
import ComputedView from './computed/ComputedView.vue'

const routes = [
  {
    path: '/',
    redirect: '/computed',
  },
  {
    path: '/computed',
    name: 'computed',
    component: ComputedView,
  },
]

export const router = createRouter({
  history: createWebHistory('/vue-computed/'),
  routes,
})
