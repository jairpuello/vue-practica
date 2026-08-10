<script setup>
import { computed, reactive } from 'vue'

const state = reactive({
  articles: [
    { id: 1, name: 'Cuaderno', price: 12.5, quantity: 2 },
    { id: 2, name: 'Boligrafo', price: 1.75, quantity: 5 },
    { id: 3, name: 'Mochila', price: 45, quantity: 1 },
  ],
  discount: 0,
})

const currency = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

const subtotal = computed(() =>
  state.articles.reduce((sum, article) => sum + article.price * article.quantity, 0),
)

const total = computed(() => subtotal.value * (1 - state.discount / 100))

let savedTotal = total.value

function format(value) {
  return currency.format(value)
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold">computed() — estado derivado</h1>
    <p class="mt-2 text-slate-600">
      El subtotal y el total no se guardan en ninguna variable: se calculan a partir
      de la lista y del descuento cada vez que algo cambia. En la plantilla se leen
      sin parentesis, y en el script como <code class="rounded bg-slate-100 px-1">total.value</code>.
    </p>

    <article class="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold">Articulos</h2>

      <table class="mt-4 w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200 text-left text-slate-500">
            <th class="py-2 font-medium">Nombre</th>
            <th class="py-2 font-medium">Precio</th>
            <th class="py-2 font-medium">Cantidad</th>
            <th class="py-2 text-right font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in state.articles"
            :key="article.id"
            class="border-b border-slate-100"
          >
            <td class="py-2">{{ article.name }}</td>
            <td class="py-2 tabular-nums">{{ format(article.price) }}</td>
            <td class="py-2">
              <input
                v-model.number="article.quantity"
                type="number"
                min="0"
                class="w-20 rounded border border-slate-300 px-2 py-1"
              />
            </td>
            <td class="py-2 text-right tabular-nums">
              {{ format(article.price * article.quantity) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-6 flex items-center gap-3">
        <label class="flex items-center gap-2 text-sm text-slate-600">
          Descuento
          <input
            v-model.number="state.discount"
            type="number"
            min="0"
            max="100"
            class="w-20 rounded border border-slate-300 px-2 py-1"
          />
          %
        </label>
      </div>

      <dl class="mt-6 space-y-2 border-t border-slate-200 pt-4 text-sm">
        <div class="flex justify-between">
          <dt class="text-slate-600">Subtotal</dt>
          <dd class="tabular-nums">{{ format(subtotal) }}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-slate-600">Descuento ({{ state.discount }} %)</dt>
          <dd class="tabular-nums">{{ format(subtotal - total) }}</dd>
        </div>
        <div class="flex justify-between text-lg font-semibold">
          <dt>Total</dt>
          <dd class="tabular-nums">{{ format(total) }}</dd>
        </div>
      </dl>
    </article>

    <article class="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold">Derivado frente a variable normal</h2>
      <p class="mt-2 text-sm text-slate-600">
        Los dos valores de abajo salen del mismo total. El primero se recalcula solo;
        el segundo se copio una vez y jamas se vuelve a escribir, asi que se queda
        con el valor inicial aunque la lista cambie.
      </p>

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="rounded border border-emerald-200 bg-emerald-50 p-4">
          <p class="text-sm font-medium text-emerald-700">computed()</p>
          <p class="mt-2 text-3xl font-bold tabular-nums">{{ format(total) }}</p>
        </div>

        <div class="rounded border border-rose-200 bg-rose-50 p-4">
          <p class="text-sm font-medium text-rose-700">let savedTotal</p>
          <p class="mt-2 text-3xl font-bold tabular-nums">{{ format(savedTotal) }}</p>
        </div>
      </div>
    </article>
  </section>
</template>
