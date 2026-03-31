# Bootcamp Project

Este proyecto forma parte del bootcamp de desarrollo.

## Planificación y diseño

Antes de comenzar la implementación se diseñó la interfaz de la aplicación.

El objetivo de TaskFlow es permitir al usuario gestionar tareas de forma sencilla.

La interfaz se divide en varias secciones principales:

* **Cabecera:** contiene el título de la aplicación.
* **Formulario:** permite añadir nuevas tareas.
* **Lista de tareas:** muestra las tareas existentes y permite marcarlas como completadas.
* **Panel de filtrado:** permite ver tareas según su estado o categoría.
* **Estadísticas:** permite visualizar una estadística de las tareas completadas y pendientes.
* **Barra de progreso:** permite visualizar tu progreso completando tareas mediante una barra.
* **Modo oscuro:** cambio de modo mediante un botón.
* **Búsqueda de tareas:** permite buscar tareas guardadas en la aplicación.
* **Calendario:** muestra un calendario donde se visualizan las tareas pendientes.

Cada tarea puede marcarse como completada o eliminarse.

El diseño inicial de la aplicación se encuentra en la carpeta `docs/design`.

## Funcionalidades
✅ Crear tareas
🗑️ Eliminar tareas
✔️ Marcar tareas como completadas
🔍 Buscar tareas
🗂️ Filtrar por estado y categoría
📅 Visualización en calendario
🌙 Modo oscuro
📊 Estadísticas con barra de progreso
✨ Nuevas funcionalidades (IA)
❤️ Marcar tareas como importantes
🔤 Ordenar tareas por nombre

## Tecnologías usadas
HTML5
CSS3 / Tailwind
JavaScript (Vanilla)
LocalStorage
Vercel (deployment)

## Cómo usar la aplicación
Pulsa en "Añadir tarea"
Introduce un título, categoría y fecha
Guarda la tarea

Puedes:
Marcarla como completada
Eliminarla
Filtrarla
Buscarla
Marcarla como importante ❤️

## Estructura del proyecto
/docs /ai index.html style.css app.js README.md

🧩 Ejemplo de uso
``` js
const task = {
  id: Date.now(),
  title: "Estudiar JavaScript",
  category: "estudio",
  date: "2026-04-10",
  completed: false,
  important: true
};
```

## Documentación del código
renderTasks()
Renderiza la lista de tareas en el DOM aplicando filtros, búsqueda y
ordenación.

renderCalendar()
Genera el calendario del mes actual y muestra las tareas.

saveTasks()
Guarda las tareas en localStorage.

## Uso de Inteligencia Artificial
Se utilizó IA para: - Refactorizar código - Detectar errores - Generar
funcionalidades - Mejorar documentación
Todo el código fue revisado manualmente.

## Testing
Se realizaron pruebas para: - Creación de tareas - Validación -
Persistencia - Calendario - Filtros

## Accesibilidad
Uso con teclado
Botones accesibles

## Aplicación
https://bootcamp-project-eight.vercel.app/

## Conclusión
Proyecto práctico que demuestra el uso de JavaScript y la integración de
IA en el desarrollo.