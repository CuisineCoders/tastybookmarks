import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../routes/authMiddleware';
import { validate, fetchHTMLContent } from './helpers';
import { RecipeParserManager } from "../recipe-parser/recipe-parser-manager";
import { getRecipeRepository } from '../model/recipeRepository';

export async function addRecipe(req: Request, res: Response): Promise<void> {
    const { userId } = req as AuthenticatedRequest;
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

        const recipeManager = new RecipeParserManager()
        const newRecipeData = recipeManager.parse(url, html);

        const savedRecipe = await getRecipeRepository(userId).addRecipe(newRecipeData);

        console.log(`Recipe successfully saved for URL: ${url}`);
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.error(`Error occurred while processing URL ${url}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch or parse the URL', error: (error as Error).message });
    }
}

export async function getAllRecipes(req: Request, res: Response): Promise<void> {
    const { userId } = req as AuthenticatedRequest;
    console.log(`\nReceived request to fetch all recipes from user ${userId}`);

    try {
        const recipes = await getRecipeRepository(userId).getAllRecipes();

        if (recipes.length === 0) {
            console.log(`No recipes found for user ${userId}`);
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

export async function getRecipeById(req: Request, res: Response): Promise<void> {
    const { userId } = req as AuthenticatedRequest;
    const { id } = req.params;
    console.log(`\nReceived request to fetch recipe with ID: ${id} from user ${userId}`);

    try {
        const recipe = await getRecipeRepository(userId).getRecipeById(id);

        if (!recipe) {
            console.error(`Recipe with ID ${id} not found`);
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        console.log(`User ${userId} successfully retrieved recipe with ID ${id}`);
        res.status(200).json(recipe);
    } catch (error) {
        console.error(`Error fetching recipe with ID ${id}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch recipe', error: (error as Error).message });
    }
}

export async function deleteRecipe(req: Request, res: Response): Promise<void> {
    const { userId } = req as AuthenticatedRequest;
    const { id } = req.params;

    console.log(`\nReceived request to delete recipe with ID: ${id} from user ${userId}`);

    try {
        const recipe = await getRecipeRepository(userId).getRecipeById(id);

        if (!recipe) {
            console.error(`Recipe with ID ${id} not found`);
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        console.log(`Deleting recipe with ID: ${id}`);
        const deletedRecipe = await getRecipeRepository(userId).deleteRecipe(id);
        console.log(`Successfully deleted recipe with ID: ${id}`);

        res.status(200).json(deletedRecipe);
    } catch (error) {
        console.error(`Error occurred while deleting recipe with ID ${id}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to delete recipe', error: (error as Error).message });
    }
}

export async function deleteAllRecipes(req: Request, res: Response): Promise<void> {
    const { userId } = req as AuthenticatedRequest;
    try {
        await getRecipeRepository(userId).deleteAllRecipes();
        res.status(200).json({ message: 'All your recipes deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete all recipes', error: (error as Error).message });
    }
}
