import { Router, json } from 'express';
import { addRecipe, getAllRecipes, getRecipeById, deleteRecipe, deleteAllRecipes } from '../controllers/recipeController';
import { verifyJWT } from './authMiddleware';

export const recipeRouter = Router();

recipeRouter.use(json());
recipeRouter.use(verifyJWT);

recipeRouter.route('/')
    .post(addRecipe)
    .get(getAllRecipes)
    .delete(deleteAllRecipes);

recipeRouter.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe);
