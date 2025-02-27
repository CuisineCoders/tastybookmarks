import { Response } from 'express';
import { AuthenticatedRequest } from '../routes/authMiddleware';
import { validate, fetchHTMLContent, extractRecipeFromHTML } from './helpers';
import { parseRecipe } from '../parser';
import { RecipeRepository } from '../model/recipeRepository';

const recipeRepository = new RecipeRepository()

export async function addRecipe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { url } = req.body;

    console.log(`\nReceived request to add recipe from URL: ${url}`);

    const validationError = validate(url);
    if (validationError) {
        console.error(`Validation error for URL ${url}: ${validationError}`);
        res.status(400).json({ error: validationError });
        return;
    }

    try {
        console.log(`Fetching HTML content for URL: ${url}`);
        const html = await fetchHTMLContent(url);

        console.log(`Extracting recipe data from HTML for URL: ${url}`);
        const recipeData = extractRecipeFromHTML(html);

        if (!recipeData) {
            console.warn(`No valid recipe data found for URL: ${url}`);
            res.status(404).json({ error: 'No valid JSON+LD Recipe found' });
            return;
        }

        console.log(`Parsing and saving recipe for URL: ${url}`);
        const newRecipeData = parseRecipe(recipeData, url);
        newRecipeData.owner = req.userId;

        const savedRecipe = await recipeRepository.addRecipe(newRecipeData);

        console.log(`Recipe successfully saved for URL: ${url}`);
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.error(`Error occurred while processing URL ${url}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch or parse the URL', error: (error as Error).message });
    }
}

export async function getAllRecipes(req: AuthenticatedRequest, res: Response): Promise<void> {
    console.log(`\nReceived request to fetch all recipes from user ${req.userId}`);

    try {
        const recipes = await recipeRepository.getAllRecipes(req.userId!);

        if (recipes.length === 0) {
            console.log(`No recipes found for user ${req.userId}`);
            res.status(204).send();
            return;
        }

        console.log(`Successfully retrieved ${recipes.length} recipes`);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error occurred while fetching recipes:', (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch recipes', error: (error as Error).message });
    }
}

export async function getRecipeById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(`\nReceived request to fetch recipe with ID: ${id} from user ${req.userId}`);

    try {
        const recipe = await recipeRepository.getRecipeById(id);

        if (!recipe) {
            console.error(`Recipe with ID ${id} not found`);
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        console.log(`Recipe with ID ${id} found, checking ownership...`);

        if (recipe.owner !== req.userId) {
            console.error(`Unauthorized access attempt by user ${req.userId} for recipe ${id}`);
            res.status(403).json({ message: 'You are not authorized to view this recipe' });
            return;
        }

        console.log(`User ${req.userId} successfully retrieved recipe with ID ${id}`);
        res.status(200).json(recipe);
    } catch (error) {
        console.error(`Error fetching recipe with ID ${id}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch recipe', error: (error as Error).message });
    }
}

export async function deleteRecipe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;

    console.log(`\nReceived request to delete recipe with ID: ${id} from user ${req.userId}`);

    try {
        const recipe = await recipeRepository.getRecipeById(id);

        if (!recipe) {
            console.error(`Recipe with ID ${id} not found`);
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        if (recipe.owner !== req.userId) {
            console.warn(`User ${req.userId} is not authorized to delete recipe with ID ${id}`);
            res.status(403).json({ message: 'You are not authorized to delete this recipe' });
            return;
        }

        console.log(`Deleting recipe with ID: ${id}`);
        const deletedRecipe = await recipeRepository.deleteRecipe(id);
        console.log(`Successfully deleted recipe with ID: ${id}`);

        res.status(200).json(deletedRecipe);
    } catch (error) {
        console.error(`Error occurred while deleting recipe with ID ${id}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to delete recipe', error: (error as Error).message });
    }
}

export async function deleteAllRecipes(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        await recipeRepository.deleteAllRecipes(req.userId!);
        res.status(200).json({ message: 'All your recipes deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete all recipes', error: (error as Error).message });
    }
}
