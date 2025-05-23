const recipes = require('../models/recipesModel')

const addRecipes = async (req, res) => {
  try {
    const newRecipe = req.body;
    await recipes.create(newRecipe);
    res.status(200).send("La receta se ha añadio correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
    addRecipes
}