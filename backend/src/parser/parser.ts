import { Recipe } from '../model/recipe';


export function parseRecipe(recipeData: any, recipesLength: number, url: string): Recipe {

    const requiredFields = ['name', 'recipeIngredient', 'recipeInstructions'];

    requiredFields.forEach((field) => {
        if (!recipeData[field]) {
            throw new Error(`Recipe data incomplete: ${field} missing`);
        }
    })

    const nutritionObject = recipeData.nutrition
        ? {
            servingSize: Number(recipeData.nutrition.servingSize) ?? undefined,
            calories: recipeData.nutrition.calories,
            proteinContent: recipeData.nutrition.proteinContent,
            fatContent: recipeData.nutrition.fatContent,
            carbohydrateContent: recipeData.nutrition.carbohydrateContent,
        }
        : undefined;

    const videoObject = recipeData.video && recipeData.video.length > 0 && recipeData.video[0].name && recipeData.video[0].contentUrl
        ? {
            name: recipeData.video[0].name,
            description: recipeData.video[0].description,
            thumbnailUrl: recipeData.video[0].thumbnailUrl,
            contentUrl: recipeData.video[0].contentUrl,
            embedUrl: recipeData.video[0].embedUrl,
            uploadDate: recipeData.video[0].uploadDate,
        }
        : undefined;

    const ingredients = recipeData.recipeIngredient.map((ingredient: string) => ingredient.trim());

    const instructions = recipeData.recipeInstructions
        .split('\n\n')
        .map((paragraph: string) => paragraph.split('\n').map((line: string) => line.trim()));

    const newRecipe: Recipe = {
        id: `${recipesLength + 1}`,
        url: url,
        name: recipeData.name,
        ingredients: ingredients,
        instructions: instructions,
        description: recipeData.description,
        image: recipeData.image,
        keywords: recipeData.keywords ?? undefined,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        totalTime: recipeData.totalTime,
        category: recipeData.recipeCategory,
        servingSize: Number(recipeData.recipeYield),
        nutrition: nutritionObject,
        video: videoObject,
    }

    
    return newRecipe;
}