import { Request, Response } from 'express';
import { validate, fetchHTMLContent, extractRecipeFromHTML } from './helpers';
import { parseRecipe } from '../parser';
import { RecipeRepository } from '../model/recipeRepository';

const recipeRepository = new RecipeRepository()

export async function addRecipe(req: Request, res: Response): Promise<void> {
    const { url } = req.body;

    console.log(`\n\nReceived request to add recipe from URL: ${url}`);

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
        const savedRecipe = await recipeRepository.addRecipe(newRecipeData);

        console.log(`Recipe successfully saved for URL: ${url}`);
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.error(`Error occurred while processing URL ${url}:`, (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch or parse the URL', error: (error as Error).message });
    }
}


export async function getAllRecipes(_req: Request, res: Response): Promise<void> {
    console.log('Received request to fetch all recipes');

    try {
        const recipes = await recipeRepository.getAllRecipes();
        console.log(`Successfully retrieved ${recipes.length} recipes`);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error occurred while fetching recipes:', (error as Error).message);
        res.status(500).json({ message: 'Failed to fetch recipes', error: (error as Error).message });
    }
}


export async function getRecipeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const recipe = await recipeRepository.getRecipeById(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipe', error: (error as Error).message });
    }
}

export async function deleteRecipe(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const deletedRecipe = await recipeRepository.deleteRecipe(id);
        res.status(200).json(deletedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete recipe', error: (error as Error).message });
    }
}

export async function deleteAllRecipes(_req: Request, res: Response): Promise<void> {
    try {
        await recipeRepository.deleteAllRecipes();
        res.status(200).json({ message: 'All recipes deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete all recipes', error: (error as Error).message });
    }
}
