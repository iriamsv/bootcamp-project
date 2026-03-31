# Comparativa de asistentes de IA

En este documento voy a comparar el comportamiento de distintos asistentes de inteligencia artificial (ChatGPT y Claude) en tareas relacionadas con el desarrollo web.

Analizaré su capacidad para:
- Explicar conceptos técnicos
- Detectar errores en código
- Generar funciones en JavaScript

También evaluaré la claridad, utilidad y calidad de sus respuestas.

## Explicación de conceptos

### Concepto: Event Loop

Prompt:
"Explica qué es el event loop en JavaScript de forma sencilla con ejemplos"

ChatGPT:
El event loop en JavaScript es lo que permite que el código maneje tareas asíncronas sin detenerse.

👉 Idea clave:
JavaScript ejecuta una cosa a la vez, pero el event loop decide cuándo ejecutar lo que queda pendiente.

🧠 Cómo funciona (muy corto)
Ejecuta el código normal (síncrono)
Las tareas lentas (timeout, promesas…) se apartan
Cuando puede, las ejecuta después
⚡ Ejemplo
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

👉 Resultado:

A
C
B
🎯 Regla rápida

Primero lo normal → luego promesas → luego timeouts

Claude:
JavaScript solo hace una cosa a la vez. El event loop es lo que le permite manejar operaciones asíncronas sin bloquearse.
jsconsole.log("1");

setTimeout(() => console.log("3"), 0); // va a la cola

console.log("2");

// Output: 1 → 2 → 3
El setTimeout se delega al navegador. Mientras tanto, el código sigue. Cuando el stack está vacío, el event loop mete el callback y se ejecuta.
En una frase: el event loop mueve callbacks de la cola al stack cuando este está libre.

Conclusión:
ChatGPT explica mejor porque organiza la información de forma más clara y fácil de entender, usando pasos simples y un resumen final muy útil.

Claude es más claro en la explicación técnica del funcionamiento interno, ya que menciona conceptos como el stack y la cola de callbacks de forma más directa.

En general, ChatGPT es más fácil para principiantes, mientras que Claude es más útil si ya tienes una base y quieres entender mejor cómo funciona por dentro.

#### Concepto: DOM


Prompt:
"Explica qué es el DOM en JavaScript"

ChatGPT:
El DOM (Document Object Model) es una representación de la página web que JavaScript puede usar para leer y modificar el contenido.

🧠 Idea simple

👉 El navegador convierte el HTML en una especie de árbol de objetos
👉 JavaScript usa ese árbol para cambiar cosas

🌳 Ejemplo de HTML
<h1>Hola</h1>

👉 El DOM lo ve así:

document
h1
"Hola"
⚡ Qué puedes hacer con el DOM

Con JavaScript puedes:

Cambiar texto
Cambiar estilos
Añadir o eliminar elementos
🔥 Ejemplo
document.querySelector("h1").textContent = "Nuevo texto";

👉 Cambia el contenido del <h1>

🎯 Resumen rápido

El DOM es lo que permite que JavaScript interactúe con la página web

Claude:
El DOM (Document Object Model) es la representación en memoria de tu HTML. Cuando el navegador carga una página, convierte el HTML en un árbol de objetos que JavaScript puede leer y modificar.
html<body>
  <h1>Hola</h1>
  <p>Mundo</p>
</body>
```
Se convierte en:
```
document
  └── body
       ├── h1 → "Hola"
       └── p  → "Mundo"
JavaScript puede entonces leer, cambiar, añadir o eliminar cualquier nodo de ese árbol:
js// Leer
document.querySelector("h1").textContent // "Hola"

// Cambiar
document.querySelector("h1").textContent = "Adiós"

// Crear y añadir
const div = document.createElement("div")
document.body.appendChild(div)

// Eliminar
document.querySelector("p").remove()
En una frase: el DOM es el puente entre tu HTML y JavaScript.

Conclusión:
ChatGPT explica mejor porque utiliza un lenguaje más sencillo y visual, lo que facilita entender rápidamente qué es el DOM.

Claude es más completo, ya que incluye más ejemplos prácticos y operaciones que se pueden hacer con el DOM, como crear o eliminar elementos.

En general, ChatGPT es mejor para una primera comprensión, mientras que Claude es más útil para ver aplicaciones prácticas en código.

##### Concepto: HOISTING

Prompt:
"Explica qué es el hoisting en JavaScript con ejemplos"

ChatGPT:
El hoisting en JavaScript es cuando el código “mueve” declaraciones al inicio antes de ejecutarse.

👉 Pero ojo: solo mueve la declaración, no el valor.

🧠 Idea simple

JavaScript “prepara” variables y funciones antes de ejecutar el código

📦 Ejemplo con var
console.log(x);
var x = 5;

👉 JavaScript lo interpreta así:

var x;
console.log(x);
x = 5;

👉 Resultado:

undefined
⚠️ Con let y const
console.log(y);
let y = 10;

👉 ❌ Error (no se puede usar antes de declararla)

Esto pasa por la “zona muerta temporal” (TDZ)

🔥 Ejemplo con funciones
saludar();

function saludar() {
  console.log("Hola");
}

👉 ✔️ Funciona porque las funciones se hoistean completas

🚫 Pero con funciones tipo variable
saludar();

var saludar = function() {
  console.log("Hola");
};

👉 ❌ Error

Porque realmente es:

var saludar;
saludar(); // undefined → error
🎯 Resumen rápido
var → se hoistea como undefined
let y const → no se pueden usar antes
function → se hoistea completa

Claude:
JavaScript mueve las declaraciones al inicio de su contexto antes de ejecutar el código. Esto es el hoisting.
Variables
jsconsole.log(nombre); // undefined (no error)
var nombre = "Ana";

// JS lo interpreta así:
var nombre;
console.log(nombre); // undefined
nombre = "Ana";
Con let y const no funciona igual — existen pero no se pueden usar antes de declararse:
jsconsole.log(nombre); // ❌ ReferenceError
let nombre = "Ana";
Funciones
Las funciones declaradas se suben completas:
jssaludar(); // ✅ "Hola" — funciona antes de declararla

function saludar() {
  console.log("Hola");
}
Pero las funciones expresadas no:
jssaludar(); // ❌ TypeError

const saludar = function() {
  console.log("Hola");
}
En una frase: var y las funciones declaradas se "suben" al inicio — let y const también, pero no se pueden usar hasta su línea de declaración.

Conclusión:
ChatGPT explica mejor porque detalla más casos y diferencias (var, let, const y funciones), además de incluir explicaciones paso a paso que ayudan a entender mejor el comportamiento.

Claude es más directo y conciso, lo que puede ser útil para repasar, pero ofrece menos detalle.

En general, ChatGPT es más completo para aprender el concepto desde cero, mientras que Claude es más resumido y técnico.

## Detección de errores

## Detección de errores

### Ejemplo 1

Código:
```js
filtersBar.querySelectorAll("button")
```

Prompt:
"Encuentra el error en este código y explícalo"

ChatGPT:
El código:

filtersBar.querySelectorAll("button")

👉 puede fallar si filtersBar no está bien definido.

❌ Error más común
const filtersBar = document.querySelector(".filters-bar");

Si ese elemento no existe en el DOM, entonces:

filtersBar === null

👉 Y al hacer:

filtersBar.querySelectorAll("button")

💥 Error:

Cannot read properties of null (reading 'querySelectorAll')
🧠 Explicación sencilla

Estás diciendo:

“Busca botones dentro de filtersBar”

Pero si filtersBar es null, es como decir:

“Busca botones dentro de… nada”

✅ Cómo solucionarlo
✔️ Opción 1: comprobar que existe
if (filtersBar) {
  filtersBar.querySelectorAll("button");
}
✔️ Opción 2: usar optional chaining
filtersBar?.querySelectorAll("button");
✔️ Opción 3: asegurarte de que el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
  const filtersBar = document.querySelector(".filters-bar");
  filtersBar.querySelectorAll("button");
});
🎯 Resumen

El error no está en querySelectorAll, sino en que filtersBar es null

Claude:
Encontré 3 errores en tu código:

❌ Error 1 — filtersBar no está definido
En varios sitios usas filtersBar.querySelectorAll("button") pero nunca declaras esa variable arriba.
js// ❌ No existe
filtersBar.querySelectorAll("button")

// ✅ Corrección — añade esto en la sección de elementos
const filtersBar = document.getElementById("filtersBar");

Conclusión:
Ambos asistentes detectan correctamente el problema, pero lo hacen de forma diferente.

ChatGPT ofrece una explicación más completa y detallada, explicando por qué ocurre el error y proponiendo varias soluciones posibles. Esto es útil para entender mejor el problema.

Claude es más directo y práctico, ya que identifica rápidamente el error principal (la variable no está definida) y da una solución clara y concreta.

En general, ChatGPT es mejor para aprender y entender el error, mientras que Claude es más útil para encontrar una solución rápida.

## Generación de código

### Ejemplo 1

Prompt:
"Crea una función en JavaScript que filtre un array de tareas y devuelva solo las tareas completadas"

ChatGPT:
✅ Función para filtrar tareas completadas
function obtenerTareasCompletadas(tareas) {
  return tareas.filter(tarea => tarea.completada === true);
}
📦 Ejemplo de uso
const tareas = [
  { nombre: "Estudiar JS", completada: true },
  { nombre: "Ir al gym", completada: false },
  { nombre: "Hacer la compra", completada: true }
];

const completadas = obtenerTareasCompletadas(tareas);

console.log(completadas);

👉 Resultado:

[
  { nombre: "Estudiar JS", completada: true },
  { nombre: "Hacer la compra", completada: true }
]
🧠 Idea clave

Usamos .filter() para quedarnos solo con los elementos que cumplen una condición

Claude:
js function getCompletedTasks(tasks) {
  return tasks.filter(task => task.completed);
}
Ejemplo de uso:
js const tasks = [
  { id: 1, title: "Comprar pan", completed: true },
  { id: 2, title: "Estudiar JS", completed: false },
  { id: 3, title: "Hacer ejercicio", completed: true },
];

getCompletedTasks(tasks);
// [
//   { id: 1, title: "Comprar pan", completed: true },
//   { id: 3, title: "Hacer ejercicio", completed: true }
// ]
Si también necesitas las pendientes, puedes generalizar la función:
jsfunction filterTasksByStatus(tasks, completed) {
  return tasks.filter(task => task.completed === completed);
}

filterTasksByStatus(tasks, true);  // completadas
filterTasksByStatus(tasks, false); // pendientes

Análisis:
- ChatGPT: ofrece una explicación más completa, con ejemplo de uso y una pequeña introducción teórica sobre filter(). Es más fácil de entender si estás aprendiendo.
- Claude: es más directo y conciso, con un código más limpio y profesional. Además, propone una versión más flexible de la función.

En general, ChatGPT es mejor para aprendizaje, mientras que Claude genera código más optimizado y reutilizable.

#### Ejemplo 2

Prompt:
"Crea una función que ordene tareas por fecha"

ChatGPT:
✅ Función para ordenar tareas por fecha
function ordenarPorFecha(tareas) {
  return tareas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}
📦 Ejemplo
const tareas = [
  { nombre: "Estudiar", fecha: "2026-04-10" },
  { nombre: "Gym", fecha: "2026-04-05" },
  { nombre: "Comprar", fecha: "2026-04-08" }
];

const ordenadas = ordenarPorFecha(tareas);

console.log(ordenadas);

👉 Resultado (de más antigua a más reciente):

[
  { nombre: "Gym", fecha: "2026-04-05" },
  { nombre: "Comprar", fecha: "2026-04-08" },
  { nombre: "Estudiar", fecha: "2026-04-10" }
]
🔁 Si quieres al revés (más reciente primero)
function ordenarPorFechaDesc(tareas) {
  return tareas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}
⚠️ Detalle importante

.sort() modifica el array original

Si no quieres eso:

return [...tareas].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
🎯 Resumen
Convertimos la fecha con new Date()
Restamos fechas para ordenarlas
.sort() organiza el array automáticamente

Claude:
js function sortTasksByDate(tasks) {
  return [...tasks].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });
}
Maneja 3 casos: ambas sin fecha (empate), una sin fecha (va al final), y ambas con fecha (orden cronológico). El spread [...tasks] evita mutar el array original.
Uso:
js const tasks = [
  { title: "Tarea C", date: "2024-03-15" },
  { title: "Tarea sin fecha", date: "" },
  { title: "Tarea A", date: "2024-01-10" },
  { title: "Tarea B", date: "2024-02-20" },
];

sortTasksByDate(tasks);
// Tarea A  → 2024-01-10
// Tarea B  → 2024-02-20
// Tarea C  → 2024-03-15
// Tarea sin fecha → al final
Si quieres orden inverso (más reciente primero), solo cambia el return:
js return new Date(b.date) - new Date(a.date);

Análisis:
- ChatGPT: explica muy bien el proceso y añade detalles importantes como el comportamiento de sort() y cómo evitar modificar el array original. Es muy didáctico.
- Claude: el código es más robusto, ya que tiene en cuenta casos reales como tareas sin fecha, algo que es muy útil en proyectos reales.

En general, ChatGPT es mejor explicando el concepto, pero Claude ofrece una solución más completa y preparada para situaciones reales.

##### Ejemplo 3

Prompt:
"Crea una función que busque tareas por texto dentro del título ignorando mayúsculas"

ChatGPT:
✅ Función
function buscarTareas(tareas, texto) {
  return tareas.filter(tarea =>
    tarea.titulo.toLowerCase().includes(texto.toLowerCase())
  );
}
📦 Ejemplo
const tareas = [
  { titulo: "Estudiar JavaScript" },
  { titulo: "Ir al Gym" },
  { titulo: "Estudiar CSS" }
];

const resultado = buscarTareas(tareas, "estudiar");

console.log(resultado);

👉 Resultado:

[
  { titulo: "Estudiar JavaScript" },
  { titulo: "Estudiar CSS" }
]
🧠 Idea clave
.toLowerCase() → para ignorar mayúsculas/minúsculas
.includes() → para buscar coincidencias
⚠️ Mejora (evitar errores si falta título)
function buscarTareas(tareas, texto) {
  return tareas.filter(tarea =>
    tarea.titulo?.toLowerCase().includes(texto.toLowerCase())
  );
}
🎯 Resumen

Convierte ambos textos a minúsculas y compara

Claude:
js function searchTasks(tasks, text) {
  const query = text.toLowerCase().trim();
  return tasks.filter(task => task.title.toLowerCase().includes(query));
}
Uso:
js const tasks = [
  { id: 1, title: "Comprar Pan" },
  { id: 2, title: "Estudiar JavaScript" },
  { id: 3, title: "comprar leche" },
];

searchTasks(tasks, "comprar");
// [
//   { id: 1, title: "Comprar Pan" },
//   { id: 3, title: "comprar leche" }
// ]

searchTasks(tasks, "JAVA");
// [{ id: 2, title: "Estudiar JavaScript" }]
El .trim() evita que espacios accidentales rompan la búsqueda. Si quieres buscar también en otras propiedades como la categoría:
js function searchTasks(tasks, text) {
  const query = text.toLowerCase().trim();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(query) ||
    task.category?.toLowerCase().includes(query)
  );
}

Análisis:
- ChatGPT: explica claramente cómo funciona la búsqueda y añade mejoras como el uso de optional chaining para evitar errores.
- Claude: mejora la función añadiendo trim() para evitar problemas con espacios y permite ampliar la búsqueda a otras propiedades como la categoría.

En general, ChatGPT es más didáctico, mientras que Claude aporta mejoras prácticas que hacen la función más útil en un proyecto real.

## Conclusión final

Durante esta comparativa he podido ver que ambos asistentes son útiles, pero tienen diferencias claras.

ChatGPT destaca por sus explicaciones claras, estructuradas y fáciles de entender, lo que lo hace ideal para aprender conceptos y entender errores.

Claude, en cambio, suele ser más directo y técnico, generando código más limpio y preparado para casos reales.

En general, ChatGPT es mejor para aprendizaje y comprensión, mientras que Claude es más útil para obtener soluciones rápidas y código más optimizado.