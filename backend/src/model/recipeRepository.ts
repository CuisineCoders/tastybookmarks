import mongoose from "mongoose";
import { Recipe } from "./recipe";
import { RecipeSchema } from "./recipeSchema";

export class RecipeRepository {
    private recipe = mongoose.model<Recipe>('Recipe', RecipeSchema);

    async addRecipe(recipeData: Partial<Recipe>): Promise<Recipe> {
        return (await this.recipe.create(recipeData)).save();
    }

    async getAllRecipes(userId: string): Promise<Recipe[]> {
        return await this.recipe.find({ owner: userId }).sort({ createdAt: -1 }).exec();
    }

    async getRecipeById(id: string): Promise<Recipe | null> {
        return await this.recipe.findById(id).exec();
    }

    async deleteRecipe(id: string): Promise<Recipe | null> {
        return await this.recipe.findByIdAndDelete(id).exec();
    }

    async deleteAllRecipes(userId: string): Promise<void> {
        await this.recipe.deleteMany({ owner: userId }).exec();
    }
}