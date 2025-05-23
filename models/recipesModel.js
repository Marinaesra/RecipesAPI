const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
  
const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  category: {
    type: [String],
    required: [true, "La categoría es obligatoria"],
  },
  ingredients: {
    type: String,
    required: [true, "Los ingredientes son obligatorios"],
  },
  difficulty: {
    type: String,
    required: [true, "La dificultad es obligatoria"],
  },
  imagenURL: {
    type: String,
    required: [false, "La URL es obligatoria"],
  },

    likes: {
        // type: [ mongoose.Schema.Types.ObjectId ], //TODO: Cambiar a ObjectId
    type: [String],
    // ref: "User",
  },
   creation: {
    type: String,
    required: [true, "El año es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  comments: [commentSchema],
    createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
const recipes = mongoose.model("Recipe", movieSchema, "recipe");
module.exports = recipes