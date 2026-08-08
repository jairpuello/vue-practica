# composition — `ref()` y `reactive()`

Ejercicio 1. Comparar las dos formas de declarar estado reactivo en Vue 3.

## Qué se practica

- `ref()` con valores primitivos, y la lectura con `.value`
- `reactive()` con objetos, y el acceso directo a sus propiedades
- El comportamiento de los dos al usarse en el `<template>`

## Qué muestra el ejercicio

Dos tarjetas lado a lado. En la de `ref()` hay un botón que suma de uno en uno.
En la de `reactive()` el botón suma según un paso que se puede cambiar con un
input, lo que muestra que una propiedad anidada también dispara la
reactividad.

## Cómo se ejecuta

```bash
npm install
npm run dev
```

La ruta del ejercicio es `/refs`, y `/` redirige allí.

## Archivos

- `src/refs/RefsView.vue` — el ejercicio
- `src/router.js` — rutas
- `src/App.vue` — índice de ejercicios