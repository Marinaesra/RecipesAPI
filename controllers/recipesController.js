const recipesModel = require("../models/recipesModel");
const userModel = require("../models/userModel");


const addRecipes = async (req, res) => {
   const isAdminUser =
    (await userModel.findById(req.payload._id)).role === "admin";
  if (!isAdminUser) {
    throw new Error("El usuario no tiene permisos de administrador");
  }
  try {
    const newRecipe = req.body;
    await recipesModel.create(newRecipe);
    res.status(200).send("La receta se ha añadio correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const allRecipesAndLikes = async (req, res) => {
  try {
    const recipe = await recipesModel.aggregate([
      {
        $project: {
          likes: 1,
          cantidadLikes: { $size: "$likes" },
        },
      },
    ]);
    if (!recipe) {
      res.status(200).send("La receta no se encuentra");
    }
    res.status(200).send({ status: "Success", data: recipe });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const recipesId = async (req, res) => {
  try {
    const { idRecipes } = req.params;
    const recipes = await recipesModel.findById(idRecipes);
    if (!recipes) {
      res.status(200).send("La receta no se encuentra");
    }
    res.status(200).send({ status: "Success", data: recipes });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const recentRecipes = async (req, res) => {
  try {
    const recipe = await recipesModel.aggregate([
      {
        $sort: { creationDate: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    if (!recipe) {
      res.status(200).send("La receta no se encuentra");
    }
    res.status(200).send({ status: "Success", data: recipe });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  addRecipes,
  allRecipesAndLikes,
  recipesId,
  recentRecipes,
};
