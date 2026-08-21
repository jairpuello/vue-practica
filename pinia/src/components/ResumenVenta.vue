<script setup>
import { formatCurrency, formatInteger } from '../composables/formatters.js'

defineProps({
  subtotal: {
    type: Number,
    required: true,
  },
  descuento: {
    type: Number,
    required: true,
  },
  descuentoValor: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  cantidadDeArticulos: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="border border-gray-300 bg-white p-6">
    <h2 class="text-sm font-medium uppercase tracking-wide text-gray-500">Resumen</h2>

    <dl class="mt-4 space-y-2 text-sm">
      <div class="flex justify-between">
        <dt class="text-gray-600">Artículos</dt>
        <dd class="tabular-nums text-gray-900">{{ formatInteger(cantidadDeArticulos) }}</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-gray-600">Subtotal</dt>
        <dd class="tabular-nums text-gray-900">{{ formatCurrency(subtotal) }}</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-gray-600">Descuento ({{ formatInteger(descuento) }} %)</dt>
        <dd class="tabular-nums text-gray-900">-{{ formatCurrency(descuentoValor) }}</dd>
      </div>
      <div class="flex justify-between border-t border-gray-300 pt-2 text-base font-semibold">
        <dt class="text-gray-900">Total</dt>
        <dd class="tabular-nums text-gray-900">{{ formatCurrency(total) }}</dd>
      </div>
    </dl>
  </div>
</template>
