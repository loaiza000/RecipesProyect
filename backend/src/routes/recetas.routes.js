import { Router } from "express";
import recipeController from "../controllers/recetasController.js";

const recipesRoute = Router();

recipesRoute.get("/", recipeController.getAllRecipes);
recipesRoute.get("/:id", recipeController.getById);
recipesRoute.get("/name/:name", recipeController.getByName);
recipesRoute.post("/", recipeController.saveRecipe);
recipesRoute.put("/:id", recipeController.updateRecipe);
recipesRoute.delete("/:id", recipeController.deleteRecipe);

export default recipesRoute;
