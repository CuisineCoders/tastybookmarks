export interface NutritionInformation {
    servingSize?: number;
    calories?: string;
    proteinContent?: string;
    fatContent?: string;
    carbohydrateContent?: string;
}

export interface VideoObject {
    name?: string;
    description?: string;
    thumbnailUrl?: string;
    contentUrl?: string;
    embedUrl?: string;
    uploadDate?: string;
}

export interface Recipe {
    id: string;
    url: string;
    name: string;
    description: string;
    image: string;
    keywords: string[];
    prepTime: string;
    cookTime?: string | null;
    totalTime: string;
    recipeCategory: string;
    recipeIngredient: string[];
    recipeInstructions: string[];
    recipeYield: number;
    nutrition?: NutritionInformation | null;
    video?: VideoObject | null;
};