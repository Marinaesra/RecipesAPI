const userModel = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = {
      name,
      email,
      password
    };
    await userModel.create(newUser);

    res.status(200).send("El usuario se ha creado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
    signup,
}