const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acceso denegado");
  try {
  } catch (error) {

    next();
  }
  try {

     next();
  } catch (error) {
    res.status(401).send({ status: "Token expired", error: error.message });
  }
};

module.exports = {
  verifyToken,
};
