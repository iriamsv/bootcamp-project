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

# Pruebas de integración realizadas
GET /api/v1/tasks

Petición

GET /api/v1/tasks

Resultado esperado

- Código 200 OK
- Devuelve un array de tareas

POST /api/v1/tasks

Petición válida

{
  "title": "Ir al gimnasio"
}

Resultado esperado

- Código 201 Created
- Devuelve la tarea creada

POST con datos inválidos

Petición

{
  "title": ""
}

Resultado esperado

- Código 400 Bad Request
- Mensaje de error indicando que el título es obligatorio

DELETE /api/v1/tasks/

Petición válida

DELETE /api/v1/tasks/123

Resultado esperado

- Código 204 No Content

DELETE de tarea inexistente

Petición

DELETE /api/v1/tasks/999999

Resultado esperado

- Código 404 Not Found
- Mensaje: "La tarea no existe"

## Backend API (Express.js)

La aplicación cuenta con un backend desarrollado en Node.js y Express.js siguiendo una arquitectura por capas:

### Estructura

server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── index.js
├── .env
└── package.json

### Tecnologías utilizadas

* Node.js
* Express.js
* CORS
* dotenv
* Nodemon

### Variables de entorno

Archivo `.env`:

PORT=3000

### Middleware utilizados

#### express.json()

Permite convertir automáticamente el cuerpo de las peticiones JSON en objetos JavaScript accesibles mediante `req.body`.

#### cors()

Permite que el frontend pueda comunicarse con el servidor mediante peticiones HTTP desde otro origen.

#### Middleware global de errores

Captura errores no controlados y devuelve respuestas HTTP adecuadas:

* 404 Not Found
* 500 Internal Server Error

---

## API REST

### Obtener tareas

GET /api/v1/tasks

Respuesta:

```json
[
  {
    "id": 1,
    "title": "Estudiar Node",
    "category": "estudio",
    "date": "2026-06-05",
    "completed": false,
    "important": false
  }
]
```

### Crear tarea

POST /api/v1/tasks

Body:

```json
{
  "title": "Estudiar Node",
  "category": "estudio",
  "date": "2026-06-05",
  "completed": false,
  "important": false
}
```

Respuesta:

* 201 Created

### Actualizar tarea

PATCH /api/v1/tasks/:id

Body:

```json
{
  "completed": true
}
```

o

```json
{
  "important": true
}
```

Respuesta:

* 200 OK

### Eliminar tarea

DELETE /api/v1/tasks/:id

Respuesta:

* 204 No Content

---

## Integración Frontend ↔ Backend

La aplicación utiliza la API Fetch para comunicarse con el backend.

Las tareas ya no se almacenan mediante LocalStorage. Toda la información se obtiene y actualiza a través de la API REST desarrollada con Express.

Actualmente se realizan peticiones para:

* Obtener tareas
* Crear tareas
* Actualizar tareas
* Eliminar tareas

---

## Pruebas de integración

Se realizaron pruebas utilizando Thunder Client.

### Casos probados

* Obtener lista de tareas
* Crear tarea válida
* Crear tarea con datos inválidos
* Actualizar tarea existente
* Eliminar tarea existente
* Eliminar tarea inexistente
* Validación de respuestas HTTP
* Validación del middleware de errores

---

## Funcionalidades implementadas

### Frontend

* Crear tareas
* Editar tareas
* Eliminar tareas
* Marcar tareas como completadas
* Marcar tareas como favoritas
* Filtro por estado
* Filtro por categoría
* Búsqueda de tareas
* Calendario interactivo
* Modo oscuro
* Drag & Drop
* Estadísticas y barra de progreso

### Backend

* Arquitectura por capas
* Variables de entorno
* API REST
* Middleware personalizados
* Validación de datos
* Manejo global de errores
* Comunicación mediante Fetch API
