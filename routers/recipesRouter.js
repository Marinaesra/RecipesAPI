const express = require("express");
const router = express.Router();
const {
    addRecipes,
    allRecipesAndLikes, 
    recipesId,
    recentRecipes
} = require('../controllers/recipesController')

router.post('/', addRecipes)
router.get('/', allRecipesAndLikes)
router.get('/getById/:idRecipes', recipesId)
router.get('/recent', recentRecipes)

module.exports = router;