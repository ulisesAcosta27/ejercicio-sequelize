const { Page, Category } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  // Modificar para devolver los datos de todas las categorias existentes
  // Tu código acá:
  const getUser = await Category.findAll()
  res.json(getUser);
});

router.get('/:idCategory', async (req, res) => {
  // Modificar para que cuando se seleccione una "Category" en particular se muestren
  // todas las páginas que estén dentro de dicha categoría
  // Tu código acá:
  const { idCategory } = req.params
  const getOnecategory = await Category.findOne({where: { id: idCategory }})
  if(getOnecategory === null){
    return res.json({error: 'Json not found'})
  }
  res.json(getOnecategory)
});

module.exports = router;
