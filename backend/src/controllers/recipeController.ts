import { Request, Response } from 'express';
import { validateURL, fetchHTMLContent, extractRecipeFromHTML } from './helpers';
import { Recipe } from '../model/recipe';

let recipes: Recipe[] = [];

export const addRecipe = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    if (!validateURL(url)) {
        res.status(400).json({ error: 'Invalid URL' });
        return;
    }

    try {
        const html = await fetchHTMLContent(url);
        const recipeData = extractRecipeFromHTML(html);

        if (!recipeData) {
            res.status(404).json({ error: 'No valid JSON+LD Recipe found' });
            return;
        }

        const newRecipe: Recipe = {
            id: `${recipes.length + 1}`,
            name: recipeData.name,
            ingredients: recipeData.recipeIngredient,
            data: recipeData
        };
        recipes.push(newRecipe);
        res.status(201).json(newRecipe);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch or parse the URL', error });
    }
};

export const getAllRecipes = (_req: Request, res: Response): void => {
    res.status(200).json(recipes);
};

export const getRecipeById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        res.status(200).json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
};

export const deleteRecipe = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index !== -1) {
        const deletedRecipe = recipes.splice(index, 1)[0];
        res.status(200).json(deletedRecipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
};

export const deleteAllRecipes = (req: Request, res: Response): void => {
    recipes = [];
    res.status(200).json({ message: 'Recipe list deleted' });
}