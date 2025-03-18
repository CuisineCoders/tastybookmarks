import { Recipe } from "../../model/recipe";

export abstract class RecipeParser {
    private requiredFields = ['name', 'recipeIngredient', 'recipeInstructions'];

    public abstract canHandle(url: string): boolean;

    public abstract parse(html: string, url: string): Recipe;

    protected requireFieldsValidation(recipeData: { [key: string]: any }): void {
        this.requiredFields.forEach((field) => {
            if (!recipeData[field]) {
                throw new Error(`Recipe data incomplete: ${field} missing`);
            }
        })
    }
}