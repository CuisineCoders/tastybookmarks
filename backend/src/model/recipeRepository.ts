import mongoose, { type Model } from "mongoose";
import { Recipe } from "./recipe";
import { RecipeSchema } from "./recipeSchema";

const repositories = new Map<string, RecipeRepository>()

export function getRecipeRepository(userId: string): RecipeRepository {
    const existingRepo = repositories.get(userId);

    if (!existingRepo){
        const newRepo = new RecipeRepository(userId);
        repositories.set(userId, newRepo);
        return newRepo;
    }

    return existingRepo;
}

class RecipeRepository {
    private recipe: Model<Recipe>;

    constructor(userId: string) {
        this.recipe = mongoose.model<Recipe>(`recipe-${userId}`, RecipeSchema);
    }

    async addRecipe(recipeData: Partial<Recipe>): Promise<Recipe> {
        return (await this.recipe.create(recipeData)).save();
    }

    async getAllRecipes(): Promise<Recipe[]> {
        return await this.recipe.find({}).sort({ createdAt: -1 }).exec();
    }

    async getRecipeById(id: string): Promise<Recipe | null> {
        return await this.recipe.findById(id).exec();
    }

    async deleteRecipe(id: string): Promise<Recipe | null> {
        return await this.recipe.findByIdAndDelete(id).exec();
    }

    async deleteAllRecipes(): Promise<void> {
        await this.recipe.deleteMany({}).exec();
    }
}