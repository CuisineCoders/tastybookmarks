import { Request, Response } from 'express';
import { validateURL, fetchHTMLContent, extractRecipeFromHTML } from './helpers';
import { Recipe } from '../model/recipe';

const recipes: Recipe[] = [];

export const addRecipe = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    if (!url) {
        console.log('Error: URL is required');
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    if (!validateURL(url)) {
        console.log('Error: Invalid URL');
        res.status(400).json({ error: 'Invalid URL' });
        return;
    }

    try {
        console.log(`Fetching HTML content from URL: ${url}`);
        const html = await fetchHTMLContent(url);
        console.log('Successfully fetched HTML content');

        const recipeData = extractRecipeFromHTML(html);

        if (!recipeData) {
            console.log('Error: No valid JSON+LD Recipe found in HTML content');
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
        console.log('Recipe added:', newRecipe);
        res.status(201).json(newRecipe);

    } catch (error) {
        console.log('Error: Failed to fetch or parse the URL', error);
        res.status(500).json({ message: 'Failed to fetch or parse the URL', error });
    }
};

export const getAllRecipes = (_req: Request, res: Response): void => {
    console.log('Get all recipes');
    res.status(200).json(recipes);
};

export const getRecipeById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        console.log('Get recipe by ID:', recipe);
        res.status(200).json(recipe);
    } else {
        console.log('Recipe not found');
        res.status(404).json({ message: 'Recipe not found' });
    }
};

export const deleteRecipe = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = recipes.findIndex((recipe) => recipe.id === id);
    
    if (index !== -1) {
        const deletedRecipe = recipes.splice(index, 1)[0];
        console.log('Recipe deleted:', deletedRecipe);
        res.status(200).json(deletedRecipe);
    } else {
        console.log('Recipe not found');
        res.status(404).json({ message: 'Recipe not found' });
    }
};
