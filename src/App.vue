<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const exercises = [{ to: '/refs', label: 'ref() vs reactive()' }]

const route = useRoute()
</script>

<template>
  <main class="mx-auto max-w-3xl p-8">
    <h1 class="text-3xl font-bold">Ejercicios de Composition API</h1>

    <nav class="mt-4 border-b border-slate-200 pb-4">
      <ul class="flex flex-wrap gap-2">
        <li v-for="exercise in exercises" :key="exercise.to">
          <RouterLink
            :to="exercise.to"
            class="rounded px-3 py-1 text-sm text-slate-600 hover:bg-white hover:text-slate-900"
            :class="route.path === exercise.to && 'bg-white text-slate-900 shadow-sm'"
          >
            {{ exercise.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <RouterView class="mt-8" />
  </main>
</template>