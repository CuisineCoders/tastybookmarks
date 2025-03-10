import { RecipeParser } from "./recipe-parser";
import { HTMLElement, parse } from "node-html-parser";
import { Recipe } from "../../model/recipe";
import { parseRecipe } from "../parser";

export class ChefkochParser implements RecipeParser {
    canHandle(url: string): boolean {
        return url.includes('chefkoch');
    }

    parse(html: string, url: string): Recipe {
        const recipeData = this.extractRecipeFromHTML(html);

        if (!recipeData) {
            console.warn(`No valid recipe data found for URL: ${url}`);
            throw new Error('No valid JSON+LD Recipe found');
        }

        return this.parseRecipe(recipeData, url) as Recipe;
    }

    private extractRecipeFromHTML(html: string): any {
        const document: HTMLElement = parse(html);
        const scripts: Array<HTMLElement> = document.querySelectorAll('script[type="application/ld+json"]');

        const jsonDataArray = scripts.map((script) => JSON.parse(script.textContent))
                                     .filter((jsonData) => jsonData.hasOwnProperty('@type'))
                                     .filter((jsonData) => jsonData['@type'] === 'Recipe');

        return jsonDataArray.shift();
    };

    private parseRecipe(recipeData: any, url: string): Partial<Recipe> {

        const requiredFields = ['name', 'recipeIngredient', 'recipeInstructions'];

        requiredFields.forEach((field) => {
            if (!recipeData[field]) {
                throw new Error(`Recipe data incomplete: ${field} missing`);
            }
        })

        const nutritionObject = recipeData.nutrition
                                ? {
                servingSize:         Number(recipeData.nutrition.servingSize) ?? undefined,
                calories:            recipeData.nutrition.calories,
                proteinContent:      recipeData.nutrition.proteinContent,
                fatContent:          recipeData.nutrition.fatContent,
                carbohydrateContent: recipeData.nutrition.carbohydrateContent,
            }
                                : undefined;

        const videoObject = recipeData.video && recipeData.video.length > 0 && recipeData.video[0].name
                            && recipeData.video[0].contentUrl
                            ? {
                name:         recipeData.video[0].name,
                description:  recipeData.video[0].description,
                thumbnailUrl: recipeData.video[0].thumbnailUrl,
                contentUrl:   recipeData.video[0].contentUrl,
                embedUrl:     recipeData.video[0].embedUrl,
                uploadDate:   recipeData.video[0].uploadDate,
            }
                            : undefined;

        const ingredients = recipeData.recipeIngredient.map((ingredient: string) => ingredient.trim());

        const instructions = recipeData.recipeInstructions
                                       .split('\n\n')
                                       .map((paragraph: string) => paragraph.split('\n')
                                                                            .map((line: string) => line.trim()));

        const newRecipe: Partial<Recipe> = {
            url:          url,
            name:         recipeData.name,
            ingredients:  ingredients,
            instructions: instructions,
            description:  recipeData.description,
            imageUrl:     recipeData.image,
            keywords:     recipeData.keywords ?? undefined,
            prepTime:     recipeData.prepTime,
            cookTime:     recipeData.cookTime,
            totalTime:    recipeData.totalTime,
            category:     recipeData.recipeCategory,
            servingSize:  Number(recipeData.recipeYield),
            nutrition:    nutritionObject,
            video:        videoObject,
        }

        return newRecipe;
    }
}