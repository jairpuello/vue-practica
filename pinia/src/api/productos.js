export async function listarProductos() {
  const response = await fetch(`${import.meta.env.BASE_URL}datos/productos.json`)

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los productos (estado HTTP ${response.status})`)
  }

  const records = await response.json()

  return records.map((record) => ({
    id: record.codigo,
    nombre: record.descripcion,
    categoria: record.categoria,
    precio: record.valor_unitario,
    existencia: record.unidades,
  }))
}
