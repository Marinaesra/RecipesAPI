const jwt = require("jsonwebtoken");
 
const generateToken = (payload, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, {
      expiresIn: "60min",
    });
  }
 
  return jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "60min",
  });
};
 
module.exports = generateToken;
 