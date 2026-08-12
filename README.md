# vue-practica

Ejercicios de Vue 3 para practicar la Composition API y afinar el resto del
ecosistema: rutas, estado global, formularios y peticiones HTTP.

Cada carpeta es un proyecto independiente con su propio `package.json`, así que
se instalan y se ejecutan por separado.

## Ejercicios

| Carpeta | Tema | Qué se practica |
|---|---|---|
| [composition](composition/) | `ref()` y `reactive()` | Cuándo usar cada uno, y por qué mutar un objeto reactivo fuera de un proxy deja de ser reactivo |
| [computed](computed/) | Estado derivado | Crear valores que se calculan solos, frente a mantener una copia que hay que actualizar a mano |

## Stack

- Vue 3 con `<script setup>`
- Vite como servidor de desarrollo y como compilador
- Tailwind CSS por CDN, sin instalarlo como dependencia
- vue-router para las rutas de cada ejercicio

## Cómo se trabaja

Cada ejercicio se desarrolla por partes, con un commit por cada parte. El
historial va por ramas estables con la misma convención de mensajes
(`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
