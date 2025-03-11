import Recipe from "../models/recetasModel.js";
import { response } from "../helpers/response.js";

const recipeController = {
  getRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: -1 });
      return response(res, 200, true, recipes, "Lista de recetas");
    } catch (error) {
      console.error("Error al obtener recetas:", error);
      return response(res, 500, false, "", `Error: ${error.message}`);
    }
  },

  saveRecipe: async (req, res) => {
    try {
      const { nombre } = req.body;
      const nameRepeated = await Recipe.findOne({ nombre: nombre });
      if (nameRepeated) {
        return response(res, 400, false, "", `La receta ${nombre} ya existe`);
      }
      const newRecipe = await Recipe.create(req.body);
      return response(res, 201, true, newRecipe, "Receta guardada");
    } catch (error) {
      console.error("Error al guardar receta:", error);
      return response(res, 500, false, "", `Error: ${error.message}`);
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe) {
        return response(res, 404, false, "", "Receta no encontrada");
      }
      return response(res, 200, true, deletedRecipe, "Receta eliminada");
    } catch (error) {
      console.error("Error al eliminar receta:", error);
      return response(res, 500, false, "", `Error: ${error.message}`);
    }
  }
};

export default recipeController;
