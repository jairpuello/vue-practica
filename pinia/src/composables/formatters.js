const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
})

const integer = new Intl.NumberFormat('es-CO')

export function formatCurrency(value) {
  return currency.format(value)
}

export function formatInteger(value) {
  return integer.format(value)
}
