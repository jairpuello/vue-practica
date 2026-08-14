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

Por ahora, la base: la aplicación arranca con Pinia registrado y una vista
provisional. El inventario y las ventas se agregan en etapas siguientes.

## Cómo se ejecuta

```bash
npm install
npm run dev
```

La ruta del ejercicio es `/principal`, y `/` redirige allí.

## Archivos

- `src/views/MainView.vue` — vista provisional
- `src/stores/` — estado de Pinia
- `src/api/` — repositorio HTTP
- `src/router.js` — rutas
- `src/main.js` — arranque con Pinia y el router
