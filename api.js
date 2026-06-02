const API_URL = "http://localhost:3000/api/v1/tasks";

export async function obtenerTareas() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener tareas");
  }

  return response.json();

}

export async function crearTarea(task) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error("Error al crear tarea");
  }

  return response.json();

}

export async function eliminarTarea(id) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Error al eliminar tarea");
  }

}

export async function actualizarTarea(id, data) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error al actualizar tarea");
  }

  return response.json();

}