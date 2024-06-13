import { Request, Response } from 'express';

const recipes: any[] = [];

export const addRecipe = (req: Request, res: Response): void => {
    const { name, ingredients } = req.body;

    if (!name || !ingredients) {
        console.log('Invalid request body:', req.body);
        res.status(400).json({ message: 'Name and ingredients are required' });
    } else {
        const newRecipe = { id: recipes.length + 1, name, ingredients };
        recipes.push(newRecipe);
        console.log('Recipe added:', newRecipe);
        res.status(201).json(newRecipe);
    }
};

export const getAllRecipes = (_req: Request, res: Response): void => {
    console.log('Get all recipes');
    res.status(200).json(recipes);
};

export const getRecipeById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const recipe = recipes.find((recipe) => recipe.id === Number(id));

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
    const index = recipes.findIndex((recipe) => recipe.id === Number(id));
    
    if (index !== -1) {
        const deletedRecipe = recipes.splice(index, 1)[0];
        console.log('Recipe deleted:', deletedRecipe);
        res.status(200).json(deletedRecipe);
    } else {
        console.log('Recipe not found');
        res.status(404).json({ message: 'Recipe not found' });
    }
};
