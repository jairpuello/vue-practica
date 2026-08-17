# pinia — estado global

Ejercicio 3. Inventario y ventas de una papelería, con el estado compartido en
Pinia.

## Qué se practica

- Separar el repositorio HTTP (`src/api/`) del estado (`src/stores/`), para que
  los stores no conozcan URLs ni formatos de respuesta
- Getters que solo leen y actions que solo escriben, sin mezclar las dos cosas
- Una sola máquina de estados para la interfaz (`inactivo`, `cargando`, `listo`,
  `error`, `vacio`), en vez de banderas sueltas que admiten combinaciones
  imposibles

## Qué muestra el ejercicio

La pantalla del catálogo: carga los productos desde el repositorio, los lista
en una tabla con búsqueda y permite reintentar cuando la carga falla. El
registro de ventas se agrega en etapas siguientes.

## Cómo se ejecuta

```bash
npm install
npm run dev
```

La ruta del ejercicio es `/catalogo`, y `/` redirige allí.

## Archivos

- `src/views/CatalogoView.vue` — pantalla del catálogo
- `src/stores/catalogo.js` — estado del catálogo y comandos
- `src/api/productos.js` — repositorio de productos
- `src/router.js` — rutas
- `src/main.js` — arranque con Pinia y el router
