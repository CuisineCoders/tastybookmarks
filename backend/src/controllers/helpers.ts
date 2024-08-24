import { HTMLElement, parse } from 'node-html-parser';
import { NutritionInformation, VideoObject, Recipe } from '../model/recipe';


export function validate(url: string): string | null {
    if (!url) {
        return 'URL is required';
    }
    try {
        new URL(url);
    } catch {
        return 'Invalid URL';
    }
    return null; // URL is valid
}

export async function fetchHTMLContent(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok, status ${response.status}`);
    }
    return response.text();
};

export function extractRecipeFromHTML(html: string): any {
    const document: HTMLElement = parse(html);
    const scripts: Array<HTMLElement> = document.querySelectorAll('script[type="application/ld+json"]');

    const jsonDataArray = scripts.map((script) => JSON.parse(script.textContent))
        .filter((jsonData) => jsonData.hasOwnProperty('@type'))
        .filter((jsonData) => jsonData['@type'] === 'Recipe');

    return jsonDataArray.shift();
};

export function parseRecipe(recipeData: any, recipesLength: number, url: string): Recipe {
    const newRecipe: Partial<Recipe> = {
        id: `${recipesLength + 1}`,
        url: url,
    };

    if (recipeData.name) newRecipe.name = recipeData.name;
    if (recipeData.description) newRecipe.description = recipeData.description;
    if (recipeData.image) newRecipe.image = recipeData.image;
    if (recipeData.keywords) newRecipe.keywords = recipeData.keywords;
    if (recipeData.prepTime) newRecipe.prepTime = recipeData.prepTime;
    if (recipeData.cookTime) newRecipe.cookTime = recipeData.cookTime;
    if (recipeData.totalTime) newRecipe.totalTime = recipeData.totalTime;
    if (recipeData.recipeCategory) newRecipe.recipeCategory = recipeData.recipeCategory;
    if (recipeData.recipeYield) newRecipe.recipeYield = Number(recipeData.recipeYield);
    if (recipeData.recipeIngredient) {
        newRecipe.recipeIngredient = recipeData.recipeIngredient
            .map((ingredient: string) => ingredient.trim());
    }
    if (recipeData.recipeInstructions) {
        newRecipe.recipeInstructions = recipeData.recipeInstructions
            .split('\n\n')
            .map((instruction: string) => instruction.split('\n').map((line: string) => line.trim()));
    }

    if (recipeData.nutrition && Object.keys(recipeData.nutrition).length > 0) {
        const nutritionData = recipeData.nutrition;
        const nutritionObject: NutritionInformation = {};

        if (nutritionData.servingSize) nutritionObject.servingSize = Number(nutritionData.servingSize);
        if (nutritionData.calories) nutritionObject.calories = nutritionData.calories;
        if (nutritionData.proteinContent) nutritionObject.proteinContent = nutritionData.proteinContent;
        if (nutritionData.fatContent) nutritionObject.fatContent = nutritionData.fatContent;
        if (nutritionData.carbohydrateContent) nutritionObject.carbohydrateContent = nutritionData.carbohydrateContent;

        if (Object.keys(nutritionObject).length > 0) {
            newRecipe.nutrition = nutritionObject;
        }
    }

    if (recipeData.video && recipeData.video.length > 0) {
        const videoData = recipeData.video[0];
        const videoObject: VideoObject = {};

        if (videoData.name) videoObject.name = videoData.name;
        if (videoData.description) videoObject.description = videoData.description;
        if (videoData.thumbnailUrl) videoObject.thumbnailUrl = videoData.thumbnailUrl;
        if (videoData.contentUrl) videoObject.contentUrl = videoData.contentUrl;
        if (videoData.embedUrl) videoObject.embedUrl = videoData.embedUrl;
        if (videoData.uploadDate) videoObject.uploadDate = videoData.uploadDate;

        if (Object.keys(videoObject).length > 0) {
            newRecipe.video = videoObject;
        }
    }

    return newRecipe as Recipe;
}