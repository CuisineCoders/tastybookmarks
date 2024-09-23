import { Request, Response } from 'express';
import { validate, fetchHTMLContent, extractRecipeFromHTML } from './helpers';
import { parseRecipe } from '../parser';
import { Recipe } from '../model/recipe';
import { RecipeRepository } from '../model/recipeRepository';

const recipeRepository = new RecipeRepository()

export async function addRecipe(req: Request, res: Response): Promise<void> {
    const { url } = req.body;

    const validationError = validate(url);
    if (validationError) {
        res.status(400).json({ error: validationError });
        return;
    }

    try {
        const html = await fetchHTMLContent(url);
        const recipeData = extractRecipeFromHTML(html);

        if (!recipeData) {
            res.status(404).json({ error: 'No valid JSON+LD Recipe found' });
            return;
        }

        const newRecipeData = parseRecipe(recipeData, url);
        const savedRecipe = await recipeRepository.addRecipe(newRecipeData)
        res.status(201).json(savedRecipe);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch or parse the URL', error: (error as Error).message });
    }
}

export async function getAllRecipes(_req: Request, res: Response): Promise<void> {
    try {
        const recipes = await recipeRepository.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes', error: (error as Error).message });
    }
}

export async function getRecipeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const recipe = await recipeRepository.getRecipeById(id);
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipe', error: (error as Error).message });
    }
}

export async function deleteRecipe(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const deletedRecipe = await recipeRepository.deleteRecipe(id);
        if (deletedRecipe) {
            res.status(200).json(deletedRecipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
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
