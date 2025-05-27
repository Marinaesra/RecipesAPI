const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Unauthorized access");
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN_REFRESH);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(401).send({ status: "Token expired", error: error.message });
    }
  }
}; 

const verifyAdmin = (req, res, next) => {
  try {
    const role = req.payload.role;
    if(role !== 'admin') {
      return res.status(401).send('No tienes permisos');
    }
    next();
  } catch (error) {
    res.status(401).send("Token expired");
  }
};


module.exports = {
  verifyToken,
  verifyAdmin
};






