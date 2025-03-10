import { Recipe } from "../../model/recipe";

export interface RecipeParser {
    canHandle(url: string): boolean;
    parse(html: string, url: string): Recipe;
}