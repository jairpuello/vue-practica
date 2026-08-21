<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="border-b border-gray-300 bg-white">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-16"
      >
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Papelería</p>
        <nav class="flex gap-6 text-sm font-medium">
          <RouterLink
            to="/catalogo"
            class="text-gray-600 hover:text-gray-900"
            active-class="text-blue-700"
          >
            Catálogo
          </RouterLink>
          <RouterLink
            to="/venta"
            class="text-gray-600 hover:text-gray-900"
            active-class="text-blue-700"
          >
            Venta
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>
