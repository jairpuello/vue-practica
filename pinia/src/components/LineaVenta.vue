<script setup>
import { formatCurrency } from '../composables/formatters.js'

defineProps({
  linea: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['cambiar-cantidad', 'quitar'])

function updateCantidad(event) {
  const value = Number(event.target.value)

  if (!Number.isFinite(value)) return

  emit('cambiar-cantidad', value)
}
</script>

<template>
  <tr class="border-b border-gray-200 last:border-b-0">
    <td class="px-4 py-3">
      <p class="text-gray-900">{{ linea.producto.nombre }}</p>
      <p class="mt-1 text-xs text-gray-500">{{ formatCurrency(linea.producto.precio) }} c/u</p>
    </td>
    <td class="px-4 py-3 text-right">
      <input
        type="number"
        min="1"
        class="w-20 border border-gray-300 bg-white px-2 py-1 text-right text-sm text-gray-900 focus:border-blue-700 focus:outline-none"
        :value="linea.cantidad"
        @input="updateCantidad"
      />
    </td>
    <td class="px-4 py-3 text-right">
      <button
        type="button"
        class="text-sm font-medium text-gray-600 hover:text-blue-700"
        @click="emit('quitar')"
      >
        Quitar
      </button>
    </td>
  </tr>
</template>
