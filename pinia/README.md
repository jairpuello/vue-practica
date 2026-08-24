# pinia — estado global

Ejercicio 3. Inventario y ventas de una papelería con Vue 3, Pinia y
vue-router. El tema es el estado global: los datos que varias pantallas
necesitan y que no deberían vivir dentro de un componente.

## Qué se practica

- Definir stores con `defineStore` y consumirlos desde las vistas
- Derivar valores con getters en vez de recalcularlos en la interfaz
- Encapsular los cambios de estado en comandos
- Modelar la carga de datos con una máquina de estados explícita
- Persistir estado del navegador sin convertirlo en una copia del servidor

## Un singleton, pero del navegador

Para quien viene de PHP, un store de Pinia se parece a un singleton: una clase
con estado propio y una sola instancia que todo el código comparte. El catálogo
se carga una vez y cualquier vista lee lo mismo, sin pasarlo de componente en
componente.

La analogía se rompe en varios puntos que conviene tener claros:

- Vive en el navegador, no en el servidor.
- Dura lo que dura la pestaña: al refrescar, el estado se borra, salvo que se
  persista a mano.
- No se comparte entre usuarios ni entre pestañas: cada una tiene su propia
  instancia.
- Su ciclo no lo manda una petición; nadie lo reinicia al terminar, así que hay
  que limpiarlo o guardarlo explícitamente cuando importa.

Un singleton de PHP vive en el proceso del servidor y su vida suele ser la de
la petición que lo creó. Confundir los dos lleva a esperar del store cosas que
solo el servidor puede dar, como compartir datos entre usuarios o sobrevivir a
un despliegue.

## Por qué no hay una capa MVVM

Si vienes de WPF/.NET o de Android, la pregunta natural es dónde está el
ViewModel. No hay tal capa, y es deliberado: Vue 3 ya hace ese trabajo. `ref()`
y `reactive()` declaran el estado, `computed()` deriva valores y
`<script setup>` conecta el estado con la plantilla. Añadir una clase ViewModel
encima duplicaría esa capa y dejaría dos fuentes de verdad del mismo estado,
que tarde o temprano se desincronizan.

MVVM es el patrón canónico de WPF/.NET y de Android (Jetpack ViewModel), no del
ecosistema Vue. Lo que MVVM persigue —separar la lógica de la vista, exponer
datos listos para pintar y no ensuciar el componente con reglas de negocio— sí
se consigue aquí, pero con las piezas que Vue ya trae: el estado en los stores,
la derivación en los getters y la presentación en los componentes.

## Arquitectura por capas

Las dependencias van en un solo sentido: `views → components → stores → api`.
Una capa puede usar la siguiente, nunca la anterior.

- `src/api/` — repositorio. Habla HTTP, conoce las URLs y traduce la respuesta
  al modelo del dominio.
- `src/stores/` — estado en memoria y los comandos que lo cambian. Consulta al
  repositorio cuando necesita datos.
- `src/composables/` — lógica reutilizable sin estado global; aquí, el formato
  de moneda y de cantidades.
- `src/components/` — presentacionales. Reciben props y emiten eventos; no
  conocen los stores ni saben que Pinia existe.
- `src/views/` — pantallas. Conectan el router, los stores y los componentes.

El repositorio no importa nada de Vue por una razón concreta: si cambia el
origen de los datos (otro endpoint, otros nombres de campos, incluso otro
framework en la interfaz), el único archivo que se toca es ese. El mapeo de
`codigo`, `descripcion`, `valor_unitario` y `unidades` al modelo `id`, `nombre`,
`precio` y `existencia` es la frontera del sistema y vive en
`src/api/productos.js`.

## CQRS dentro del store

CQRS (Command Query Responsibility Segregation) separa las operaciones que leen
de las que escriben. Viene del principio de separar comandos y consultas en el
diseño de software; en su forma mínima, una consulta no cambia el estado y un
comando no responde con datos.

En Pinia, las consultas son los getters y los comandos son las actions. Este
código cumple las dos reglas:

- Los getters solo leen y calculan: `subtotal`, `total`, `descuentoValor`,
  `productosFiltrados`. Ninguno toca el estado.
- Las actions solo escriben y no devuelven nada. `cargarCatalogo()` deja el
  resultado en el estado; `agregarProducto()` modifica las líneas y no entrega
  la línea nueva para que la vista haga cuentas con ella.

Así se evitan dos vicios comunes: el getter que muta, que esconde una escritura
detrás de una lectura y vuelve imposible rastrear quién cambió el estado; y la
vista que calcula, que reparte reglas de negocio por las plantillas y termina
con una versión distinta del total en cada pantalla.

## La máquina de estados de la interfaz

La pantalla del catálogo no usa banderas sueltas (`cargando`, `error`, `vacio`)
que se puedan combinar de formas imposibles, como estar cargando y con error a
la vez. Usa un solo valor, `loadState`, que solo puede tomar uno de cinco:

- `inactivo` — todavía no se pidió nada
- `cargando` — hay una petición en curso
- `listo` — llegaron productos
- `error` — la petición falló y hay un mensaje para mostrar
- `vacio` — la petición terminó bien pero no hay productos

Cada transición sale de una acción y la plantilla dibuja exactamente una rama
según el estado. La idea es hacer imposibles los estados imposibles: si el
estado solo puede tomar un valor, no hay que defender la interfaz de
combinaciones que nunca deberían darse.

## Persistencia: el store no es el servidor

La venta en curso (las líneas y el descuento) se guarda en `localStorage` con
la clave `papeleria-venta`. El guardado lo dispara un `watch` sobre el estado,
no una escritura manual dentro de cada comando: así ningún camino que cambie
las líneas se queda sin persistir.

Al crear el store, el estado se hidrata desde `localStorage`. Si el contenido
no está, está corrupto o no tiene la forma esperada, el store arranca vacío en
vez de romper la aplicación. La hidratación tampoco reescribe lo que acaba de
leer: no hay una escritura inmediata después de cargar.

Guardar en el navegador no convierte al store en el servidor. `localStorage` es
del dispositivo y de la pestaña, se puede borrar desde el navegador y nadie más
lo ve. Cuando exista un backend real, la venta tendrá que confirmarse allí;
esto solo evita perder el trabajo al refrescar.

## Cómo se ejecuta

```bash
npm install
npm run dev
```

- `/catalogo` — catálogo con búsqueda
- `/venta` — venta en curso; `/` redirige al catálogo
- `npm run build` — compila a `dist/`, publicable bajo `/vue-pinia/`

## Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | Documento base; carga Tailwind por CDN y el arranque de la aplicación |
| `vite.config.js` | Configuración de Vite; fija la base `/vue-pinia/` |
| `package.json` | Dependencias (Vue, Pinia, vue-router) y scripts |
| `public/datos/productos.json` | Inventario de ejemplo con los nombres de campos del sistema de origen |
| `src/main.js` | Crea la aplicación y registra Pinia y el router |
| `src/router.js` | Rutas `/catalogo` y `/venta`; `/` redirige a la primera |
| `src/App.vue` | Encabezado con los dos enlaces y el `RouterView` |
| `src/api/productos.js` | Repositorio: pide el JSON y mapea cada registro al modelo del dominio |
| `src/stores/catalogo.js` | Catálogo, búsqueda, máquina de estados y comandos de carga |
| `src/stores/venta.js` | Venta en curso: líneas, descuento, totales y persistencia |
| `src/composables/formatters.js` | Formato de moneda (COP) y cantidades con `Intl.NumberFormat('es-CO')` |
| `src/components/ListaProductos.vue` | Lista de productos; emite el evento de agregar a la venta |
| `src/components/LineaVenta.vue` | Una línea de la venta; emite cambio de cantidad y quitar |
| `src/components/ResumenVenta.vue` | Pinta subtotal, descuento y total ya calculados |
| `src/views/CatalogoView.vue` | Pantalla del catálogo |
| `src/views/VentaView.vue` | Pantalla de venta; conecta stores y componentes |
