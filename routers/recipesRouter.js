const express = require("express");
const router = express.Router();
const {
    addRecipes,
    allRecipesAndLikes, 
    recipesId,
    recentRecipes,
    updateRecipe,
    deleteRecipe,
    addComentRecipe,
    addLikeRecipe,
    deleteLikeRecipe
} = require('../controllers/recipesController');
const { verifyToken, verifyAdmin } = require("../middleware/auth");
//const { route } = require("./userRouter");

router.post('/', verifyToken, verifyAdmin, addRecipes)
router.get('/', allRecipesAndLikes)
router.get('/getById/:idRecipes', recipesId)
router.get('/recent', recentRecipes)
router.patch('/:idRecipe', verifyToken, verifyAdmin, updateRecipe)
router.delete('/:idRecipe', verifyToken, verifyAdmin, deleteRecipe)
router.patch('/coment/:idRecipe',verifyToken,verifyAdmin, addComentRecipe)
router.patch('/like',verifyToken, addLikeRecipe)
router.delete('/removelike',verifyToken, deleteLikeRecipe)

module.exports = router;