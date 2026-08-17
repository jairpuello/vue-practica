import { createRouter, createWebHistory } from 'vue-router'
import CatalogoView from './views/CatalogoView.vue'

const router = createRouter({
  history: createWebHistory('/vue-pinia/'),
  routes: [
    {
      path: '/',
      redirect: '/catalogo'
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogoView
    }
  ]
})

export default router
