export interface NutritionInformation {
  servingSize?: number
  calories?: string;
  proteinContent?: string;
  fatContent?: string;
  carbohydrateContent?: string;
}

export interface VideoObject {
  name: string;
  description?: string;
  thumbnailUrl?: string;
  contentUrl: string;
  embedUrl?: string;
  uploadDate?: string;
}

export interface Recipe {
  _id: string;
  url: string;
  name: string;
  description?: string;
  imageUrl?: string;
  keywords?: Array<string>;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  category?: string;
  cuisine?: string;
  ingredients: Array<string>;
  instructions: Array<Array<string>>;
  servingSize: number
  nutrition?: NutritionInformation;
  video?: VideoObject;
}
