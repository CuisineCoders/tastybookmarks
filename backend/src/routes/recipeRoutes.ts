import { Router, json } from 'express';
import { addRecipe, getAllRecipes, getRecipeById, deleteRecipe } from '../controllers/recipeController';

const router = Router();

router.use(json());

router.route('/')
    .post(addRecipe)
    .get(getAllRecipes);

router.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe);

export default router;
