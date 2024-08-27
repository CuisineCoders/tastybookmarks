import { NutritionInformation, VideoObject, Recipe } from '../model/recipe';


export function parseRecipe(recipeData: any, recipesLength: number, url: string): Recipe {

    if (!recipeData.name) {
        throw new Error('Recipe data incomplete: name missing');
    }

    if (!recipeData.recipeIngredient) {
        throw new Error('Recipe data incomplete: ingredients missing');
    }

    if (!recipeData.recipeInstructions) {
        throw new Error('Recipe data incomplete: instructions missing');
    }

    const nutritionObject: NutritionInformation | undefined = recipeData.nutrition && Object.keys(recipeData.nutrition).length > 0
        ? {
            servingSize: Number(recipeData.nutrition.servingSize),
            calories: recipeData.nutrition.calories,
            proteinContent: recipeData.nutrition.proteinContent,
            fatContent: recipeData.nutrition.fatContent,
            carbohydrateContent: recipeData.nutrition.carbohydrateContent,
        }
        : undefined;

    const videoObject: VideoObject | undefined = recipeData.video && recipeData.video.length > 0 && recipeData.video[0].name && recipeData.video[0].contentUrl
        ? {
            name: recipeData.video[0].name,
            description: recipeData.video[0].description,
            thumbnailUrl: recipeData.video[0].thumbnailUrl,
            contentUrl: recipeData.video[0].contentUrl,
            embedUrl: recipeData.video[0].embedUrl,
            uploadDate: recipeData.video[0].uploadDate,
        }
        : undefined;

    const ingredients: Array<string> = recipeData.recipeIngredient
        ? recipeData.recipeIngredient.map((ingredient: string) => ingredient.trim())
        : undefined;

    const instructions: Array<Array<string>> = recipeData.recipeInstructions
        ? recipeData.recipeInstructions
            .split('\n\n')
            .map((paragraph: string) => paragraph.split('\n').map((line: string) => line.trim()))
        : undefined;

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