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

const updateRecipe = async (req, res) => {
  const isAdminUser =
    (await userModel.findById(req.payload._id)).role === "admin";
  if (!isAdminUser) {
    throw new Error("El usuario no tiene permisos de administrador");
  }
  try {
    const idUser = req.params.idUser;
    const newRecipe = req.body;
    const updateRecipe = await recipesModel.findByIdAndUpdate(
      idUser,
      newRecipe,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateRecipe) {
      return res.status(200).send("No hay receta");
    }
    res.status(200).send({ status: "Success", data: updateRecipe });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const isAdminUser =
    (await userModel.findById(req.payload._id)).role === "admin";
  if (!isAdminUser) {
    throw new Error("El usuario no tiene permisos de administrador");
  }
  try {
    const idUser = req.params.idUser;
    await recipesModel.findByIdAndDelete(idUser);
    res
      .status(200)
      .send({ status: "Sucess", data: "La receta se elimino correctamente" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addComentRecipe = async (req, res) => {
  try {
    const idUser  = req.params.idUser;
    const { comment, rating } = req.body;
    const userId = req.payload._id;

    const recipe = await recipesModel.findById(idUser);

    if (!recipe) {
      return res.status(200).send("La receta no existe");
    }

    const newComent = {
      userId: userId,
      comment: comment,
      rating: rating
    };

    recipe.comments.push(newComent);
    recipe.save();

    res.status(200).send({ status: "Success", data: recipe });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addLikeRecipe = async (req, res) => {
  try {
    const { idUser } = req.params;
     const idRecipe = req.payload._id
    const user = await userModel.findById(idRecipe);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    const recipe = await recipeModel.findById(idUser);
    if (!recipe) {
      return res.status(200).send("No hay receta");
    }

    if (user.favouritesRecipes.includes(idUser)) {
      return res.status(200).send("Le has dado like a la receta");
    }

    user.favouritesRecipes.push(idUser);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteLikeRecipe = async (req, res) => {
  try {
    const { idUser } = req.params;
     const idRecipe = req.payload._id
    const user = await userModel.findById(idRecipe);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    const recipe = await recipeModel.findById(idUser);
    if (!recipe) {
      return res.status(200).send("No hay receta");
    }

    if (user.likes.includes(idUser)) {
      return res.status(200).send("Le has quitado el like a la receta");
    }

    user.likes.push(idUser);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  addRecipes,
  allRecipesAndLikes,
  recipesId,
  recentRecipes,
  updateRecipe,
  deleteRecipe,
  addComentRecipe,
  addLikeRecipe,
  deleteLikeRecipe
};
