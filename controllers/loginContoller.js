const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/authToken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    };
    await userModel.create(newUser);

    res.status(200).send("El usuario se ha creado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email: email })
      .select("name email password role");

    if (!user) {
      return res.status(404).send("Usuario o contraseña no validos");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).send("Usuario o contraseña no validos");
    }

    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = generateToken(payload, false);
    const token_refresh = generateToken(payload, true);

    res
      .status(200)
      .send({ status: "Success", data: user, token: token, token_refresh });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};


module.exports = {
  signup,
  login,
};
