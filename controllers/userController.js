const userModel = require("../models/userModel");
const recipeModel = require("../models/recipesModel");

const addFavouriteRecipe = async (req, res) => {
  try {
    const { idRecipe } = req.params;
     const idUser = req.payload._id
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    const recipe = await recipeModel.findById(idRecipe);
    if (!recipe) {
      return res.status(200).send("No hay receta");
    }

    if (user.favourites.includes(idRecipe)) {
      return res.status(200).send("La receta ya está en favoritos");
    }

    user.favourites.push(idRecipe);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
    addFavouriteRecipe,
}