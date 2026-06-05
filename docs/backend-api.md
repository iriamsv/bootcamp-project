# Backend API - Conceptos utilizados

## Axios

Axios es una librería de JavaScript utilizada para realizar peticiones HTTP desde aplicaciones frontend o backend.

Permite enviar solicitudes GET, POST, PATCH, PUT y DELETE de forma sencilla y ofrece ventajas como:

* Conversión automática de respuestas JSON.
* Manejo simplificado de errores.
* Interceptores para procesar peticiones y respuestas.
* Compatibilidad con navegadores y Node.js.

Ejemplo:

```javascript
axios.get("/api/v1/tasks")
  .then(response => {
    console.log(response.data);
  });
```

En este proyecto se ha utilizado la API nativa `fetch()`, aunque Axios sería una alternativa válida.

---

## Postman

Postman es una herramienta para probar y documentar APIs.

Permite:

* Enviar peticiones HTTP.
* Configurar cabeceras y cuerpos JSON.
* Guardar colecciones de pruebas.
* Comprobar códigos de estado HTTP.
* Automatizar pruebas de integración.

Durante el desarrollo de una API REST es útil para verificar el comportamiento de los endpoints sin necesidad de utilizar el frontend.

Ejemplos de pruebas realizadas:

* GET /api/v1/tasks
* POST /api/v1/tasks
* PATCH /api/v1/tasks/:id
* DELETE /api/v1/tasks/:id

---

## Sentry

Sentry es una plataforma de monitorización y seguimiento de errores.

Su objetivo es detectar excepciones y problemas que ocurren en producción.

Características principales:

* Registro automático de errores.
* Información detallada de las excepciones.
* Seguimiento del rendimiento.
* Alertas en tiempo real.
* Historial de incidencias.

Es ampliamente utilizado para identificar errores que los usuarios encuentran una vez desplegada la aplicación.

---

## Swagger

Swagger es una herramienta utilizada para documentar APIs REST.

Permite generar documentación interactiva donde se muestran:

* Endpoints disponibles.
* Métodos HTTP.
* Parámetros de entrada.
* Respuestas esperadas.
* Ejemplos de uso.

Gracias a Swagger, otros desarrolladores pueden comprender y consumir una API sin necesidad de revisar directamente el código fuente.

Ejemplo de endpoint documentado:

```http
GET /api/v1/tasks
```

Respuesta:

```json
[
  {
    "id": 1,
    "title": "Estudiar Node.js"
  }
]
```

---

## Tecnologías utilizadas en este proyecto

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API

### Backend

* Node.js
* Express.js
* CORS
* dotenv
* Nodemon

### Arquitectura

La aplicación sigue una arquitectura por capas:

* Routes: definición de endpoints.
* Controllers: gestión de peticiones y respuestas.
* Services: lógica de negocio.
* Config: variables de entorno.

Esta separación facilita el mantenimiento, la escalabilidad y la reutilización del código.
