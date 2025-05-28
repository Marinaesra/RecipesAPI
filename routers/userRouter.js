const express = require("express");
const router = express.Router();

const {
    addFavouriteRecipe,
    deleteFavouriteRecipe,
    getMyFavourites,
    updateUser
} = require('../controllers/userController')
const {verifyToken, verifyAdmin} = require("../middleware/auth")

router.get("/myFavourites", verifyToken,verifyAdmin, getMyFavourites);
router.post('/favourite/:idRecipe', verifyToken, addFavouriteRecipe)
router.get("/", verifyToken, verifyAdmin)
router.delete("/deleteFavourite/:idRecipe", verifyToken, deleteFavouriteRecipe )
router.put("/replaceDataUser/:idUser", verifyToken, updateUser);


module.exports = router;