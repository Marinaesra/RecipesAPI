const express = require("express");
const router = express.Router();

const {
    addFavouriteRecipe
} = require('../controllers/userController')
const {verifyToken} = require("../middlewares/auth")

router.post('/favourite/:idRecipe', addFavouriteRecipe)

module.exports = router;