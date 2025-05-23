const express = require("express");
const router = express.Router();
const {
    addRecipes,
} = require('../controllers/recipesController')

router.post('/', addRecipes)

module.exports = router;