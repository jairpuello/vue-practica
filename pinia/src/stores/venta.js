import { defineStore } from 'pinia'
import { useCatalogoStore } from './catalogo.js'

export const useVentaStore = defineStore('venta', {
  state: () => ({
    lines: [],
    descuento: 0,
  }),

  getters: {
    lineas: (state) => state.lines,

    subtotal: (state) =>
      state.lines.reduce((sum, linea) => sum + linea.producto.precio * linea.cantidad, 0),

    descuentoValor() {
      return (this.subtotal * this.descuento) / 100
    },

    total() {
      return this.subtotal - this.descuentoValor
    },

    cantidadDeArticulos: (state) =>
      state.lines.reduce((sum, linea) => sum + linea.cantidad, 0),

    estaVacia: (state) => state.lines.length === 0,
  },

  actions: {
    agregarProducto(productoId) {
      const catalogo = useCatalogoStore()
      const producto = catalogo.productos.find((item) => item.id === productoId)

      if (!producto) return

      const linea = this.lines.find((item) => item.producto.id === productoId)

      if (linea) {
        linea.cantidad += 1
        return
      }

      this.lines.push({ producto, cantidad: 1 })
    },

    quitarProducto(productoId) {
      this.lines = this.lines.filter((item) => item.producto.id !== productoId)
    },

    cambiarCantidad(productoId, cantidad) {
      const linea = this.lines.find((item) => item.producto.id === productoId)

      if (!linea || !Number.isFinite(cantidad)) return

      linea.cantidad = Math.max(1, Math.trunc(cantidad))
    },

    aplicarDescuento(porcentaje) {
      const valor = Number(porcentaje)

      if (!Number.isFinite(valor)) return

      this.descuento = Math.min(30, Math.max(0, valor))
    },

    vaciarVenta() {
      this.lines = []
      this.descuento = 0
    },
  },
})
