import { response } from "../helpers/response.js";
import { recipesModel } from "../models/recetasModel.js";

const recipeController = {};

recipeController.getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.find();
    return response(res, 200, true, recipes, "Recipe list ");
  } catch (error) {
    return response(res, 500, false, "", `error ${error.message}`);
  }
};

recipeController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeFound = await recipesModel.findById({ _id: id });
    if (!recipeFound) {
      return response(res, 404, false, "", "recipe not found");
    }
 
    return response(res, 200, true, recipeFound, "recipe found");
  } catch (error) {
    return response(res, 500, false, "", `error ${error.message}`);
  }
};

recipeController.saveRecipe = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nameRepeated = await recipesModel.findOne({ nombre: nombre });
    if (nameRepeated) {
      return response(
        res,
        400,
        false,
        "",
        `name ${nombre} is already registered`
      );
    }
    const newRecipe = await recipesModel.create(req.body);
    return response(res, 201, true, newRecipe, "recipe saved");
  } catch (error) {
    return response(res, 500, false, "", `error ${error.message}`);
  }
};

recipeController.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const recipeFound = await recipesModel.findById({ _id: id });
    const nameRepeated = await recipesModel.findOne({ nombre: nombre });
    if (!recipeFound) {
      return response(res, 404, false, "", "recipe not found");
    }

    if (nameRepeated) {
      return response(
        res,
        400,
        false,
        "",
        `name ${nombre} is already registered`
      );
    }

    await recipesModel.updateOne(req.body);
    return response(res, 200, true, "", "recipe updated");
  } catch (error) {
    return response(res, 500, false, "", `error ${error.message}`);
  }
};

recipeController.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeFound = await recipesModel.findById({ _id: id });
    if (!recipeFound) {
      return response(res, 404, false, "", "recipe not found");
    }
    await recipeFound.deleteOne();
    return response(res, 200, true, "", "recipe deleted");
  } catch (error) {
    return response(res, 500, false, "", `error ${error.message}`);
  }
};

recipeController.getByName = async (req, res) => {
  try {
    const { name } = req.params;
    const recipeFoundByName = await recipesModel.findOne({ nombre: name });
    if (!recipeFoundByName) {
      return response(
        res,
        404,
        false,
        "",
        `recipe with name ${name} not found`
      );
    }

    return response(res, 200, true, recipeFoundByName, "recipe found");
  } catch (error) {
    return response(res, 500, false, "", `error ${error.message}`);
  }
};

export default recipeController;
