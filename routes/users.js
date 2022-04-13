const { Page, User } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  // Modificar para renderizar todas los usuarios que se encuentren
  // dento de la base de datos
  // Tu código acá:
  const getUser = await User.findAll();
  res.json(getUser);
});

router.get("/:id", async (req, res) => {
  // Modificar para renderizar los datos del usuario seleccionado
  // Tu código acá:
  const { id } = req.params;
  const getOneUser = await User.findOne({ where: { id: id } });
  if (getOneUser === null) {
    return res.json({ error: "Json not found" });
  }
  res.json(getOneUser);
});

module.exports = router;
