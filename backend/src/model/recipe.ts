export interface NutritionInformation {
    servingSize?: number;
    calories?: string;
    proteinContent?: string;
    fatContent?: string;
    carbohydrateContent?: string;
}

export interface VideoObject {
    name: string;
    contentUrl: string;
    description?: string;
    thumbnailUrl?: string;
    embedUrl?: string;
    uploadDate?: string;
}

export interface Recipe {
    id: string;
    url: string;
    name: string;
    ingredients: Array<string>;
    instructions: Array<Array<string>>;
    description?: string;
    image?: string;
    keywords?: Array<string>;
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    category?: string;
    servingSize?: number;
    nutrition?: NutritionInformation;
    video?: VideoObject;
};