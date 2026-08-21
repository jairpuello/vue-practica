import { createRouter, createWebHistory } from 'vue-router'
import CatalogoView from './views/CatalogoView.vue'
import VentaView from './views/VentaView.vue'

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
    },
    {
      path: '/venta',
      name: 'venta',
      component: VentaView
    }
  ]
})

export default router
