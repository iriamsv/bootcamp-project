# Experimentos con inteligencia artificial

En este documento voy a comparar la resolución de distintos problemas de programación con y sin el uso de inteligencia artificial.

Analizaré:
- Tiempo invertido
- Calidad del código
- Nivel de comprensión del problema

El objetivo es evaluar el impacto real de la IA en el proceso de desarrollo.

## Refactorización

### Sin IA

Intenté refactorizar algunas funciones del código manualmente.

Tiempo invertido:
Mayor, ya que tuve que revisar todo el código paso a paso.

Resultado:
El código mejoró ligeramente, pero no identifiqué todos los problemas.

Comprensión:
Me ayudó a entender mejor la lógica del programa, pero me resultó más lento.


### Con IA

Le pedí a la IA que refactorizara algunas funciones para mejorar la limpieza y organización del código.

Tiempo invertido:
Menor, ya que la IA generó soluciones rápidamente.

Resultado:
El código quedó más limpio y organizado, pero apareció un error.

Problema encontrado:
Durante el proceso de refactorización, el calendario dejó de funcionar.

Tras investigar, detecté que el problema no estaba en la función del calendario, sino en un error anterior en el código: la función updateStats() no estaba definida.

Esto provocaba que el script se detuviera y no se ejecutara renderCalendar().

Solución:
Añadí la función faltante y el calendario volvió a funcionar correctamente.


### Conclusión

La IA me permitió ahorrar tiempo y mejorar la estructura del código rápidamente.

Sin embargo, también comprobé que puede introducir errores si no reviso el código generado.

Este experimento me ayudó a entender que la IA es una herramienta muy útil, pero es necesario revisar siempre los cambios y entender el código.

## Uso de MCP (Model Context Protocol)

En este apartado he investigado qué es MCP y cómo se puede utilizar en el desarrollo.

### ¿Qué es MCP?

MCP (Model Context Protocol) es un sistema que permite a la inteligencia artificial acceder a información externa como archivos del proyecto, repositorios o datos en tiempo real.

Esto permite que la IA tenga más contexto y pueda dar respuestas más precisas.


### Configuración

Intenté conectar un servidor MCP en Cursor.

Probé con un servidor de tipo filesystem, que permite acceder a los archivos del proyecto.


### Pruebas realizadas

Realicé varias consultas usando la IA:

1. "Lee mi archivo app.js y explícalo"
2. "Analiza cómo se gestionan las tareas en el proyecto"
3. "¿Qué funciones podrían mejorarse?"
4. "Explica cómo funciona renderTasks()"
5. "¿Cómo se guardan los datos en localStorage?"


### Resultados

La IA fue capaz de analizar el código del proyecto y dar explicaciones más precisas al tener acceso directo a los archivos.

Esto permitió obtener respuestas más útiles que sin contexto.


### Conclusión

El uso de MCP puede ser muy útil en proyectos reales, ya que permite a la IA trabajar con información real del proyecto.

Esto mejora la calidad de las respuestas y facilita tareas como el análisis de código, depuración y refactorización.

## Problemas de programación

### Problema 1 – Filtrar tareas completadas

#### Sin IA
Tiempo: Medio  
Resultado: Conseguí hacerlo usando filter(), pero tuve que pensar bastante la lógica.

#### Con IA
Tiempo: Rápido  
Resultado: La IA generó la función correctamente en pocos segundos.

#### Conclusión
La IA reduce el tiempo y ayuda a obtener una solución rápida, pero hacerlo sin IA ayuda a entender mejor el método filter().


### Problema 2 – Ordenar por fecha

#### Sin IA
Tiempo: Alto  
Resultado: Me costó recordar cómo comparar fechas correctamente.

#### Con IA
Tiempo: Rápido  
Resultado: La IA generó una función funcional y además explicó cómo usar new Date().

#### Conclusión
La IA facilita tareas más complejas, pero es importante entender cómo funcionan las fechas en JavaScript.


### Problema 3 – Buscar por texto

#### Sin IA
Tiempo: Medio  
Resultado: Conseguí hacerlo, pero no tuve en cuenta mayúsculas/minúsculas.

#### Con IA
Tiempo: Rápido  
Resultado: La IA propuso usar toLowerCase(), lo que mejoró la función.

#### Conclusión
La IA no solo da soluciones, también mejora detalles que pueden pasarse por alto.