# computed — estado derivado

Ejercicio 2. Crear valores que se calculan solos a partir del estado, en vez
de mantener una copia que hay que actualizar a mano.

## Qué se practica

- `computed()` y por qué el valor se lee sin paréntesis
- La diferencia entre estado base y estado derivado
- Cuándo un `computed` es un `ref` y cuándo se apoya en `reactive()`
- El fallo de mantener una variable normal que se supone que refleja el estado,
  y por qué la interfaz deja de actualizarse sin avisar

## Qué muestra el ejercicio

Una lista de artículos con cantidad y precio. El total se deriva del estado, y
un campo de descuento lo recalcula. Al pie aparece el contraste entre el valor
derivado y una variable normal que se queda quieta.

## Cómo se ejecuta

```bash
npm install
npm run dev
```

La ruta del ejercicio es `/computed`, y `/` redirige allí.

## Archivos

- `src/computed/ComputedView.vue` — el ejercicio
- `src/router.js` — rutas
- `src/App.vue` — índice de ejercicios