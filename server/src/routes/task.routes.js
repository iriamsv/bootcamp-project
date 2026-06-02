const express = require("express");

const {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea
} = require("../controllers/task.controller");

const router = express.Router();

/* GET */
router.get("/", obtenerTodas);

/* POST */
router.post("/", crearTarea);

/* DELETE */
router.delete("/:id", eliminarTarea);

/* UPDATE */
router.patch("/:id", actualizarTarea);

module.exports = router;