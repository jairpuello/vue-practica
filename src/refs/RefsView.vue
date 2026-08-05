<script setup>
import { reactive, ref } from 'vue'

const count = ref(0)

const state = reactive({
  count: 0,
  step: 1,
})

function incrementRef() {
  count.value += 1
}

function incrementReactive() {
  state.count += state.step
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold">ref() vs reactive()</h1>
    <p class="mt-2 text-slate-600">
      Los dos crean estado reactivo. La diferencia esta en que tan facil se puede
      leer y escribir desde el script.
    </p>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-emerald-700">ref()</h2>
        <p class="mt-2 text-sm text-slate-600">
          Acepta cualquier valor. En el script se accede con
          <code class="rounded bg-slate-100 px-1">.value</code>, aunque en el
          template no hace falta escribirlo.
        </p>

        <p class="mt-6 text-4xl font-bold tabular-nums">{{ count }}</p>

        <div class="mt-4 flex gap-2">
          <button
            type="button"
            class="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            @click="incrementRef"
          >
            Sumar 1
          </button>
        </div>
      </article>

      <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-sky-700">reactive()</h2>
        <p class="mt-2 text-sm text-slate-600">
          Solo funciona con objetos. Se accede por propiedad
          (<code class="rounded bg-slate-100 px-1">state.count</code>), sin
          <code class="rounded bg-slate-100 px-1">.value</code> en ningun lado.
        </p>

        <p class="mt-6 text-4xl font-bold tabular-nums">{{ state.count }}</p>

        <div class="mt-4 flex items-center gap-3">
          <button
            type="button"
            class="rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
            @click="incrementReactive"
          >
            Sumar
          </button>
          <label class="flex items-center gap-2 text-sm text-slate-600">
            Paso
            <input
              v-model.number="state.step"
              type="number"
              min="1"
              class="w-20 rounded border border-slate-300 px-2 py-1"
            />
          </label>
        </div>
      </article>
    </div>
  </section>
</template>