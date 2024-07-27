import mongoose from "mongoose";

const { model, Schema } = mongoose;

const recipeSchema = new Schema(
  {
    nombre: { type: String, require: [true, "El campo nombre es obligatorio"] },
    ingredientes: {
      type: [{ nombre: String, cantidad: Number }],
      require: [
        true,
        "El campo nombre y catindad de ingredientes son obligatorios",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const recipesModel = model("recipe", recipeSchema);
