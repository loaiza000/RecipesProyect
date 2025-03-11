import { Router } from "express";
import recipeController from "../controllers/recetasController.js";

const router = Router();

// GET test
router.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

// GET recipes
router.get("/recipes", recipeController.getRecipes);
// POST recipes
router.post("/recipes", recipeController.saveRecipe);
// DELETE recipes
router.delete("/recipes/:id", recipeController.deleteRecipe);

export default router;
