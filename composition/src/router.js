import { createRouter, createWebHistory } from 'vue-router'
import RefsView from './refs/RefsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/refs',
  },
  {
    path: '/refs',
    name: 'refs',
    component: RefsView,
  },
]

export const router = createRouter({
  history: createWebHistory('/vue-composition/'),
  routes,
})