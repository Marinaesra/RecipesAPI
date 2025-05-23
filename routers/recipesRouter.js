const express = require("express");
const router = express.Router();
const {
    addRecipes,
    allRecipesAndLikes
} = require('../controllers/recipesController')

router.post('/', addRecipes)
router.get('/', allRecipesAndLikes)

module.exports = router;