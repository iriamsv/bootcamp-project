const taskService = require("../services/task.service");

/* GET /tasks */

const obtenerTodas = (req, res) => {

  const tareas = taskService.obtenerTodas();

  res.status(200).json(tareas);

};

/* POST /tasks */

const crearTarea = (req, res, next) => {

  const { title } = req.body;

  try {

    if (
      !title ||
      typeof title !== "string" ||
      title.trim().length < 3
    ) {
      return res.status(400).json({
        error: "El título es obligatorio y debe tener al menos 3 caracteres."
      });
    }

    const nuevaTarea = taskService.crearTarea({
      title
    });

    res.status(201).json(nuevaTarea);

  } catch (error) {

    next(error);

  }

};

/* DELETE /tasks/:id */

const eliminarTarea = (req, res, next) => {

  try {

    taskService.eliminarTarea(req.params.id);

    res.status(204).send();

  } catch (error) {

    next(error);

  }

};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};