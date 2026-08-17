<script setup>
import { onMounted } from 'vue'
import { useCatalogoStore } from '../stores/catalogo.js'

const catalogo = useCatalogoStore()

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
})

const integer = new Intl.NumberFormat('es-CO')

onMounted(() => {
  catalogo.cargarCatalogo()
})
</script>

<template>
  <main class="min-h-screen bg-gray-100 px-6 py-10 sm:px-10 lg:px-16">
    <section class="mx-auto max-w-6xl">
      <header class="border-b border-gray-300 pb-6">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Papelería</p>
        <h1 class="mt-2 text-2xl font-semibold tracking-tight text-gray-950">Catálogo</h1>
      </header>

      <div v-if="catalogo.loadState === 'inactivo' || catalogo.loadState === 'cargando'" class="mt-8" role="status">
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

      <p v-else-if="catalogo.loadState === 'vacio'" class="mt-8 text-sm text-gray-600">
        El catálogo no tiene productos.
      </p>

      <template v-else-if="catalogo.loadState === 'listo'">
        <div class="mt-8 max-w-md">
          <label class="block text-sm font-medium text-gray-700" for="busqueda">Buscar</label>
          <input
            id="busqueda"
            type="search"
            class="mt-2 w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-700 focus:outline-none"
            placeholder="Nombre o categoría"
            :value="catalogo.search"
            @input="catalogo.actualizarBusqueda($event.target.value)"
          />
        </div>

        <div class="mt-6 flex gap-6 text-sm text-gray-600">
          <p>
            Productos:
            <span class="font-medium text-gray-900">{{ integer.format(catalogo.totalProductos) }}</span>
          </p>
          <p>
            Existencias bajas:
            <span class="font-medium text-gray-900">{{ integer.format(catalogo.existenciasBajas.length) }}</span>
          </p>
        </div>

        <p v-if="catalogo.productosFiltrados.length === 0" class="mt-6 text-sm text-gray-600">
          No hay productos que coincidan con la búsqueda.
        </p>

        <div v-else class="mt-6 overflow-x-auto border border-gray-300 bg-white">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-300 text-left text-gray-500">
                <th class="px-4 py-3 font-medium">Código</th>
                <th class="px-4 py-3 font-medium">Producto</th>
                <th class="px-4 py-3 font-medium">Categoría</th>
                <th class="px-4 py-3 text-right font-medium">Precio</th>
                <th class="px-4 py-3 text-right font-medium">Existencia</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in catalogo.productosFiltrados"
                :key="product.id"
                class="border-b border-gray-200 last:border-b-0"
              >
                <td class="px-4 py-3 text-gray-500">{{ product.id }}</td>
                <td class="px-4 py-3 text-gray-900">{{ product.nombre }}</td>
                <td class="px-4 py-3 text-gray-600">{{ product.categoria }}</td>
                <td class="px-4 py-3 text-right tabular-nums text-gray-900">{{ currency.format(product.precio) }}</td>
                <td class="px-4 py-3 text-right tabular-nums text-gray-900">{{ integer.format(product.existencia) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>
  </main>
</template>
