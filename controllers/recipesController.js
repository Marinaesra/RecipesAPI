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

const allRecipesAndLikes = async (req,res) => {
  try {
  const recipe = await recipes.find();
  if (recipe.length === 0){
    return res.status(200).send({message:"La receta no existe"});
  }
  console.log(recipe)
  // recipe.likes = recipe.likes ? 0: recipe.likes.length;
 //recipe.likes.numLikes = 0
  res.status(200).send({ status: "Success", data: recipe });
  } catch (error) {
   res.status(500).send({ status: "Failed", error: error.message });
  
}};



module.exports = {
    addRecipes,
    allRecipesAndLikes
}