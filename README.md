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

---

# Testing manual de la aplicación

Se realizaron distintas pruebas manuales para comprobar el correcto funcionamiento de la aplicación.

## 1. Prueba con la lista vacía

**Acción:**  
Abrir la aplicación sin tareas guardadas.

**Resultado esperado:**  
La lista aparece vacía y las estadísticas muestran:

Total: 0
Completadas: 0
Pendientes: 0


**Resultado obtenido:**  
La aplicación muestra correctamente una lista vacía y las estadísticas en 0.

---

## 2. Intentar añadir una tarea sin título

**Acción:**  
Abrir el formulario de nueva tarea y pulsar guardar sin introducir un título.

**Resultado esperado:**  
La tarea no se crea.

**Resultado obtenido:**  
La aplicación no permite crear tareas sin título, funcionando correctamente la validación.

---

## 3. Añadir una tarea con un título muy largo

**Acción:**  
Crear una tarea con un texto largo.

**Resultado esperado:**  
La tarea se muestra correctamente sin romper el diseño.

**Resultado obtenido:**  
La tarea se muestra correctamente dentro de la tarjeta y el diseño se mantiene.

---

## 4. Marcar varias tareas como completadas

**Acción:**  
Marcar varias tareas utilizando el checkbox.

**Resultado esperado:**  

- Las tareas cambian a estado completado  
- El texto aparece tachado  
- Las estadísticas se actualizan  

**Resultado obtenido:**  
Las tareas cambian correctamente de estado y las estadísticas se actualizan automáticamente.

---

## 5. Eliminar varias tareas

**Acción:**  
Eliminar varias tareas utilizando el botón "Eliminar".

**Resultado esperado:**  

- Las tareas desaparecen de la lista  
- Las estadísticas se actualizan  

**Resultado obtenido:**  
Las tareas se eliminan correctamente y las estadísticas reflejan los cambios.

---

## 6. Recargar la página

**Acción:**  
Recargar el navegador.

**Resultado esperado:**  
Las tareas creadas previamente se mantienen guardadas.

**Resultado obtenido:**  
Las tareas se mantienen correctamente gracias al almacenamiento en `localStorage`.

---

# Conclusión

Las pruebas realizadas confirman que la aplicación funciona correctamente en los siguientes aspectos:

- Creación de tareas  
- Validación de datos  
- Cambio de estado de tareas  
- Eliminación de tareas  
- Persistencia de datos tras recargar la página  

## Accesibilidad básica

Se realizaron varias comprobaciones básicas de accesibilidad para asegurar que la aplicación pueda ser utilizada por diferentes tipos de usuarios.

### Uso con teclado
Se comprobó que la aplicación puede utilizarse únicamente con el teclado.  
Mediante la tecla **Tab** es posible navegar entre los distintos elementos interactivos de la interfaz:

- Botón **Añadir tarea**
- Botón **Buscar**
- Filtros (**Todas, Pendientes, Completadas**)
- Selector de **Categorías**
- Botón de **modo oscuro**
- Botones dentro del **modal de creación de tareas**

Todos los elementos interactivos pueden activarse usando **Enter**.

---

### Botones accesibles
Se revisó que todos los botones tengan:

- Texto visible, o
- Un atributo `aria-label` cuando el botón contiene solo un icono.

---

### Aplicación desplegada

Puedes acceder a la aplicación aquí:

https://bootcamp-project-eight.vercel.app/

---

### Tecnologías utilizadas

- HTML5
- CSS3/ Tailwind
- JavaScript (Vanilla)
- LocalStorage
- Vercel (deployment)