let tasks = [];

const obtenerTodas = () => {
  return tasks;
};

const crearTarea = (data) => {

  const nuevaTarea = {
    id: Date.now(),
    ...data
  };

  tasks.push(nuevaTarea);

  return nuevaTarea;
};

const eliminarTarea = (id) => {

  const index = tasks.findIndex(
    task => task.id === Number(id)
  );

  if (index === -1) {
    throw new Error("NOT_FOUND");
  }

  tasks.splice(index, 1);

};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};