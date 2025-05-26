const express = require("express");
const { signup
 } = require("../controllers/loginContoller");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;