import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCatalogoStore } from './catalogo.js'

const STORAGE_KEY = 'papeleria-venta'

function isValidProduct(product) {
  return (
    product !== null &&
    typeof product === 'object' &&
    typeof product.id === 'string' &&
    typeof product.nombre === 'string' &&
    typeof product.categoria === 'string' &&
    Number.isFinite(product.precio) &&
    Number.isFinite(product.existencia)
  )
}

function isValidLine(line) {
  return (
    line !== null &&
    typeof line === 'object' &&
    isValidProduct(line.producto) &&
    Number.isFinite(line.cantidad) &&
    line.cantidad > 0
  )
}

function readSavedVenta() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return null

    const saved = JSON.parse(raw)

    if (saved === null || typeof saved !== 'object' || Array.isArray(saved)) return null

    return {
      lines: Array.isArray(saved.lines) ? saved.lines.filter(isValidLine) : [],
      descuento: Number.isFinite(saved.descuento)
        ? Math.min(30, Math.max(0, saved.descuento))
        : 0,
    }
  } catch {
    return null
  }
}

export const useVentaStore = defineStore('venta', () => {
  const saved = readSavedVenta()
  const lines = ref(saved ? saved.lines : [])
  const descuento = ref(saved ? saved.descuento : 0)

  const lineas = computed(() => lines.value)

  const subtotal = computed(() =>
    lines.value.reduce((sum, linea) => sum + linea.producto.precio * linea.cantidad, 0)
  )

  const descuentoValor = computed(() => (subtotal.value * descuento.value) / 100)

  const total = computed(() => subtotal.value - descuentoValor.value)

  const cantidadDeArticulos = computed(() =>
    lines.value.reduce((sum, linea) => sum + linea.cantidad, 0)
  )

  const estaVacia = computed(() => lines.value.length === 0)

  function agregarProducto(productoId) {
    const catalogo = useCatalogoStore()
    const producto = catalogo.productos.find((item) => item.id === productoId)

    if (!producto) return

    const linea = lines.value.find((item) => item.producto.id === productoId)

    if (linea) {
      linea.cantidad += 1
      return
    }

    lines.value.push({ producto, cantidad: 1 })
  }

  function quitarProducto(productoId) {
    lines.value = lines.value.filter((item) => item.producto.id !== productoId)
  }

  function cambiarCantidad(productoId, cantidad) {
    const linea = lines.value.find((item) => item.producto.id === productoId)

    if (!linea || !Number.isFinite(cantidad)) return

    linea.cantidad = Math.max(1, Math.trunc(cantidad))
  }

  function aplicarDescuento(porcentaje) {
    const valor = Number(porcentaje)

    if (!Number.isFinite(valor)) return

    descuento.value = Math.min(30, Math.max(0, valor))
  }

  function vaciarVenta() {
    lines.value = []
    descuento.value = 0
  }

  watch(
    [lines, descuento],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          lines: lines.value.map((linea) => ({
            producto: { ...linea.producto },
            cantidad: linea.cantidad,
          })),
          descuento: descuento.value,
        })
      )
    },
    { deep: true }
  )

  return {
    lines,
    descuento,
    lineas,
    subtotal,
    descuentoValor,
    total,
    cantidadDeArticulos,
    estaVacia,
    agregarProducto,
    quitarProducto,
    cambiarCantidad,
    aplicarDescuento,
    vaciarVenta,
  }
})
