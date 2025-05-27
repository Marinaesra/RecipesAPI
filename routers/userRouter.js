const express = require("express");
const router = express.Router();

const {
    addFavouriteRecipe
} = require('../controllers/userController')
const {verifyToken, verifyAdmin} = require("../middleware/auth")

router.post('/favourite/:idRecipe', addFavouriteRecipe)
router.get("/", verifyToken, verifyAdmin)

module.exports = router;