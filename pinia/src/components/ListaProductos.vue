<script setup>
import { formatCurrency, formatInteger } from '../composables/formatters.js'

defineProps({
  productos: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['agregar'])
</script>

<template>
  <div class="border border-gray-300 bg-white">
    <p v-if="productos.length === 0" class="px-4 py-6 text-sm text-gray-600">
      No hay productos disponibles.
    </p>

    <table v-else class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-300 text-left text-gray-500">
          <th class="px-4 py-3 font-medium">Producto</th>
          <th class="px-4 py-3 text-right font-medium">Precio</th>
          <th class="px-4 py-3 text-right font-medium">Existencia</th>
          <th class="px-4 py-3">
            <span class="sr-only">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in productos"
          :key="product.id"
          class="border-b border-gray-200 last:border-b-0"
        >
          <td class="px-4 py-3">
            <p class="text-gray-900">{{ product.nombre }}</p>
            <p class="mt-1 text-xs text-gray-500">{{ product.categoria }}</p>
          </td>
          <td class="px-4 py-3 text-right tabular-nums text-gray-900">
            {{ formatCurrency(product.precio) }}
          </td>
          <td class="px-4 py-3 text-right tabular-nums text-gray-600">
            {{ formatInteger(product.existencia) }}
          </td>
          <td class="px-4 py-3 text-right">
            <button
              type="button"
              class="border border-gray-400 px-3 py-1 text-sm font-medium text-gray-800 hover:border-blue-700 hover:text-blue-700"
              @click="emit('agregar', product.id)"
            >
              Agregar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
