<script setup>
import { onMounted } from 'vue'
import { useCatalogoStore } from '../stores/catalogo.js'
import { useVentaStore } from '../stores/venta.js'
import ListaProductos from '../components/ListaProductos.vue'
import LineaVenta from '../components/LineaVenta.vue'
import ResumenVenta from '../components/ResumenVenta.vue'

const catalogo = useCatalogoStore()
const venta = useVentaStore()

function aplicarDescuento(event) {
  const value = Number(event.target.value)

  if (!Number.isFinite(value)) return

  venta.aplicarDescuento(Math.min(30, Math.max(0, value)))
}

onMounted(() => {
  catalogo.cargarCatalogo()
})
</script>

<template>
  <main class="px-6 py-10 sm:px-10 lg:px-16">
    <section class="mx-auto max-w-6xl">
      <h1 class="text-2xl font-semibold tracking-tight text-gray-950">Venta</h1>

      <div
        v-if="catalogo.loadState === 'inactivo' || catalogo.loadState === 'cargando'"
        class="mt-8"
        role="status"
      >
        <p class="text-sm text-gray-600">Cargando catálogo...</p>
      </div>

      <div v-else-if="catalogo.loadState === 'error'" class="mt-8 border border-gray-300 bg-white p-6">
        <p class="text-sm text-gray-800">{{ catalogo.errorMessage }}</p>
        <button
          type="button"
          class="mt-4 border border-gray-400 px-4 py-2 text-sm font-medium text-gray-800 hover:border-blue-700 hover:text-blue-700"
          @click="catalogo.cargarCatalogo()"
        >
          Reintentar
        </button>
      </div>

      <div v-else class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <h2 class="text-sm font-medium uppercase tracking-wide text-gray-500">Productos</h2>
          <ListaProductos
            class="mt-4"
            :productos="catalogo.productos"
            @agregar="venta.agregarProducto"
          />
        </div>

        <div>
          <h2 class="text-sm font-medium uppercase tracking-wide text-gray-500">Venta en curso</h2>

          <p
            v-if="venta.estaVacia"
            class="mt-4 border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600"
          >
            No hay productos en la venta.
          </p>

          <div v-else class="mt-4 border border-gray-300 bg-white">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-300 text-left text-gray-500">
                  <th class="px-4 py-3 font-medium">Producto</th>
                  <th class="px-4 py-3 text-right font-medium">Cantidad</th>
                  <th class="px-4 py-3">
                    <span class="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <LineaVenta
                  v-for="line in venta.lineas"
                  :key="line.producto.id"
                  :linea="line"
                  @cambiar-cantidad="venta.cambiarCantidad(line.producto.id, $event)"
                  @quitar="venta.quitarProducto(line.producto.id)"
                />
              </tbody>
            </table>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700" for="descuento">Descuento</label>
            <div class="mt-2 flex items-center gap-2">
              <input
                id="descuento"
                type="number"
                min="0"
                max="30"
                step="1"
                class="w-24 border border-gray-300 bg-white px-3 py-2 text-right text-sm text-gray-900 focus:border-blue-700 focus:outline-none"
                :value="venta.descuento"
                @input="aplicarDescuento"
              />
              <span class="text-sm text-gray-600">%</span>
            </div>
          </div>

          <ResumenVenta
            class="mt-6"
            :subtotal="venta.subtotal"
            :descuento="venta.descuento"
            :descuento-valor="venta.descuentoValor"
            :total="venta.total"
            :cantidad-de-articulos="venta.cantidadDeArticulos"
          />
        </div>
      </div>
    </section>
  </main>
</template>
