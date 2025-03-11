import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
    trim: true,
  },
  ingredientes: [{
    nombre: {
      type: String,
      required: [true, "El nombre del ingrediente es requerido"],
      trim: true,
    },
    cantidad: {
      type: Number,
      required: [true, "La cantidad es requerida"],
      min: [1, "La cantidad debe ser mayor a 0"],
    },
  }],
}, {
  timestamps: true,
  versionKey: false,
});

export default model("Recipe", recipeSchema);
