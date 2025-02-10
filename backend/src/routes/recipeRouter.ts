import { Router, json } from 'express';
import { addRecipe, getAllRecipes, getRecipeById, deleteRecipe, deleteAllRecipes } from '../controllers/recipeController';
import { verifyJWT } from './authMiddleware';

export const recipeRouter = Router();

recipeRouter.use(json());

recipeRouter.route('/')
    .post(verifyJWT, addRecipe)
    .get(verifyJWT, getAllRecipes)
    .delete(verifyJWT, deleteAllRecipes);

recipeRouter.route('/:id')
    .get(verifyJWT, getRecipeById)
    .delete(verifyJWT, deleteRecipe);
