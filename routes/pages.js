const router = require("express").Router();
const { Page, User } = require("../models");

router.post("/", async (req, res) => {
  // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
  // tomando los datos desde el form y agregándolo a la base de datos
  // (Debe incluir también la categoría a la/s cual/es pertenece)
  // Tu código acá:
  const { title, urlTitle, content, status } = req.body;
  if ([title, urlTitle, content, status].includes("")) {
    return res
      .status(404)
      .json({ error: "Algo anda mal intente crear nuevamente su post :)" });
  }
  const createPost = {
    title,
    urlTitle,
    content,
    status,
  };
  const postCreated = await Page.create(createPost);
  res
  .status(200)
  .json({ created: "El post fue creado correctamente" });
});

router.get("/add", async (req, res) => {
  const getPost = await Page.findAll();
  res.json(getPost);
});

router.get("/:urlTitle", async (req, res) => {
  // Modificar para que cuando se seleccione un "Page" en particular se muestren
  // los datos asociados al mismo
  // Tu código acá:
  const { urlTitle } = req.params;
  const getOnePost = await Page.findOne({ where: { urlTitle: urlTitle } });
  if (getOnePost === null) {
    return res.json({ error: "Page not found" });
  }
  res.json(getOnePost);
});

module.exports = router;
