import { Router, json } from 'express';
import { addRecipe, getAllRecipes, getRecipeById, deleteRecipe } from '../controllers/recipeController';

export const recipeRouter = Router();

recipeRouter.use(json());

recipeRouter.route('/')
    .post(addRecipe)
    .get(getAllRecipes);

recipeRouter.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe);
