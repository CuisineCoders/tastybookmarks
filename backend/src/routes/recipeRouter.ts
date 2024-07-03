import { Router, json } from 'express';
import { addRecipe, getAllRecipes, getRecipeById, deleteRecipe, deleteAllRecipes } from '../controllers/recipeController';

export const recipeRouter = Router();

recipeRouter.use(json());

recipeRouter.route('/')
    .post(addRecipe)
    .get(getAllRecipes)
    .delete(deleteAllRecipes);

recipeRouter.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe);
