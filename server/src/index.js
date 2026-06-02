const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");
const taskRoutes = require("./routes/task.routes");

const app = express();

/* Middlewares */

app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

/* Ruta de prueba */

app.get("/", (req, res) => {
  res.json({
    message: "Servidor TaskFlow funcionando"
  });
});

/* Arrancar servidor */

app.use((err, req, res, next) => {

  if (err.message === "NOT_FOUND") {
    return res.status(404).json({
      error: "La tarea no existe"
    });
  }

  console.error(err);

  res.status(500).json({
    error: "Error interno del servidor"
  });

});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});