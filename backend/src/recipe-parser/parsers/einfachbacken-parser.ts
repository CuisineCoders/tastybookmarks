import { RecipeParser } from "./recipe-parser";
import { HTMLElement, parse } from "node-html-parser";
import { Recipe } from "../../model/recipe";

export class EinfachbackenParser extends RecipeParser {
    canHandle(url: string): boolean {
        return url.includes('einfachbacken.de');
    }

    parse(url: string, html: string): Recipe {
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

        let jsonDataArray = scripts.map((script) => {
            try {
                return JSON.parse(script.textContent);
            } catch (error) {
                console.error("JSON parsing error:", error);
                return null;
            }
        }).filter((jsonData) => jsonData !== null);

        const graphData = jsonDataArray.find((jsonData) => Array.isArray(jsonData["@graph"]));
        if (graphData) {
            return graphData["@graph"].find((entry: any) => entry["@type"] === "Recipe") ?? null;
        }
    };

    private parseRecipe(recipeData: any, url: string): Partial<Recipe> {
        this.requireFieldsValidation(recipeData);

        const ingredients = recipeData.recipeIngredient.map((ingredient: string) => ingredient.trim());

        const instructions = recipeData.recipeInstructions.map((step: string) => step.trim().split('\n'));

        return {
            url: url,
            name: recipeData.name,
            ingredients: ingredients,
            instructions: instructions,
            description: recipeData.description,
            imageUrl: recipeData.image?.url ? recipeData.image.url.split('.jpg')[0] + '.jpg' : undefined,
            keywords: recipeData.keywords.split(',') ?? undefined,
            prepTime: recipeData.prepTime !== 'PT0M' ? recipeData.prepTime : undefined,
            cookTime: recipeData.cookTime,
            totalTime: recipeData.totalTime,
            category: recipeData.recipeCategory,
            cuisine: recipeData.recipeCuisine,
            servingSize: Number(recipeData.recipeYield[0]) ?? undefined,
        };
    }
}
