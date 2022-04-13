const { db, Category, Page } = require("./models");
var app = require("./index.js");

const force = true;
db.sync({ force }).then(function () {
  app.listen(3001, function () {
    console.log("Server is listening on port 3001!");

    // Descomentar estas lineas:

    const catAutos = Category.create({
      name: "Autos",
      description: "Categoria que habla sobre autos",
    });

    const catDeportes = Category.create({
      name: "Deportes",
      description: "Categoria que habla sobre Deportes",
    });

    const catVideojuegos = Category.create({
      name: "Videojuegos",
      description: "Categoria que habla sobre Videojuegos",
    });
    // Pages

    const primeraPagina = Page.create({
      title: "Primera Pagina",
      urlTitle: "the best seller in the world",
      content: "what happend in SudAfrica",
      status: "open",
    });

    const segundaPagina = Page.create({
      title: "Segunda Pagina",
      urlTitle: "the now of ultra miami",
      content: "will be bach Swedish House Mafia to UMF?",
      status: "open",
    });

    Promise.all([
      catAutos,
      catDeportes,
      catVideojuegos,
      primeraPagina,
      segundaPagina,
    ]).then((res) => {
      console.log("Categorías precargadas");
    });
  });
});
