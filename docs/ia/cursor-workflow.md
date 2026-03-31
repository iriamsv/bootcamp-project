# Uso de Cursor en el proyecto

En este documento voy a explicar cómo he utilizado Cursor como entorno de desarrollo asistido por inteligencia artificial.

Documentaré:
- Las funcionalidades que he utilizado
- Cómo me ha ayudado a mejorar el código
- Atajos de teclado utilizados
- Ejemplos reales dentro del proyecto TaskFlow

## Funcionalidades utilizadas

Durante el desarrollo he utilizado:

- Autocompletado con IA
- Chat contextual
- Edición inline
- Composer

---

### Autocompletado

Escribí un comentario: // función para filtrar tareas completadas

```js
function filterCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  return completedTasks;
}
```
Cursor generó automáticamente una función usando filter().

Resultado:
El código era correcto y funcional, lo que me permitió ahorrar tiempo.

#### Refactorización
Seleccioné una función del proyecto y usé:

"Refactoriza esta función para que sea más limpia"

Antes:
```js
function filterCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  return completedTasks;
}
```

Después:
```js
const filterCompletedTasks = () => tasks.filter(task => task.completed);
```

Mejora:
El código quedó más limpio y fácil de entender.

##### Uso del chat

Utilicé el chat para entender funciones como renderTasks().

Prompt:
"Explícame qué hace esta función"

Resultado:
La explicación fue clara y me ayudó a entender mejor el código.

###### Atajos de teclado utilizados

Ctrl + K → editar con IA
Ctrl + L → abrir chat
Tab → aceptar sugerencias

###### Conclusión

Cursor es una herramienta muy útil porque permite escribir y mejorar código más rápido.
Es especialmente útil para refactorizar funciones y entender código complejo.
Sin embargo, es importante revisar siempre el código generado.
