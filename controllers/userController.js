const userModel = require("../models/userModel");
const recipeModel = require("../models/recipesModel");

const getMyFavourites = async (req, res) => {
  try {
    const idUser = req.payload._id;
    const user = await userModel
      .findById(idUser)
      .populate({ path: "favouritesRecipes"});

    if (!user) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send({ status: "Sucess", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

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

    if (user.favouritesRecipes.includes(idRecipe)) {
      return res.status(200).send("La receta ya está en favoritos");
    }

    user.favouritesRecipes.push(idRecipe);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteFavouriteRecipe = async (req, res) => {
  try {
    const {idRecipe} = req.params;
     const idUser = req.payload._id;
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    if (!user.favouritesRecipes.includes(idRecipe)) {
      return res.status(200).send("La receta NO  está en favoritos");
    }

    user.favouritesRecipes.pull(idRecipe);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const newUser = req.body;
    const updateUser = await userModel.findOneAndReplace(
      { _id: idUser },
      newUser,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateUser) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send({ status: "Success", data: updateUser });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};


module.exports = {
    addFavouriteRecipe,
    deleteFavouriteRecipe,
    getMyFavourites,
    updateUser
}