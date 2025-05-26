const express = require("express");
const router = express.Router();
const {
    addRecipes,
    allRecipesAndLikes, 
    recipesId
} = require('../controllers/recipesController')

router.post('/', addRecipes)
router.get('/', allRecipesAndLikes)
router.get('/getById/:idRecipes', recipesId)

module.exports = router;