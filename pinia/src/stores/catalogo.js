import { defineStore } from 'pinia'
import { listarProductos } from '../api/productos.js'

function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export const useCatalogoStore = defineStore('catalogo', {
  state: () => ({
    items: [],
    search: '',
    loadState: 'inactivo',
    errorMessage: '',
  }),

  getters: {
    productos: (state) => state.items,

    productosFiltrados: (state) => {
      const term = normalizeText(state.search.trim())

      if (!term) return state.items

      return state.items.filter((product) => {
        const name = normalizeText(product.nombre)
        const category = normalizeText(product.categoria)

        return name.includes(term) || category.includes(term)
      })
    },

    totalProductos: (state) => state.items.length,

    existenciasBajas: (state) => state.items.filter((product) => product.existencia < 10),
  },

  actions: {
    async cargarCatalogo() {
      if (this.loadState === 'cargando' || this.loadState === 'listo' || this.loadState === 'vacio') {
        return
      }

      this.loadState = 'cargando'
      this.errorMessage = ''

      try {
        const products = await listarProductos()
        this.items = products
        this.loadState = products.length === 0 ? 'vacio' : 'listo'
      } catch (error) {
        this.items = []
        this.errorMessage = error.message
        this.loadState = 'error'
      }
    },

    actualizarBusqueda(texto) {
      this.search = texto
    },
  },
})
