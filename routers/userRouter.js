const express = require("express");
const router = express.Router();

const {
    addFavouriteRecipe,
    deleteFavouriteRecipe,
    getMyFavourites
} = require('../controllers/userController')
const {verifyToken, verifyAdmin} = require("../middleware/auth")

router.get("/myFavourites", verifyToken,verifyAdmin, getMyFavourites);
router.post('/favourite/:idRecipe', verifyToken, addFavouriteRecipe)
router.get("/", verifyToken, verifyAdmin)
router.delete("/deleteFavourite/:idRecipe", verifyToken, deleteFavouriteRecipe )

module.exports = router;