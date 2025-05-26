const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [5, "El nombre debe de tener al menos 5 caracteres"],
    maxxlength: 30
  },
  lastName: {
    type: String,
    required: [false, "El apellido no es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "El correo ya existe"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favouritesRecipes: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: "Recipes",
  },

});


const userModel = mongoose.model("User", userSchema, "user");
 
module.exports = userModel;