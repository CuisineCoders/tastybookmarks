import { Schema } from 'mongoose';
import { NutritionInformation, VideoObject, Recipe } from './recipe';


const NutritionInformationSchema: Schema = new Schema<NutritionInformation>({
    servingSize: { type: Number },
    calories: { type: String },
    proteinContent: { type: String },
    fatContent: { type: String },
    carbohydrateContent: { type: String }
});

const VideoObjectSchema: Schema = new Schema<VideoObject>({
    name: { type: String, required: true },
    contentUrl: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    embedUrl: { type: String },
    uploadDate: { type: String }
});

export const RecipeSchema: Schema = new Schema<Recipe>({
    url: { type: String, required: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [[String]], required: true },
    description: { type: String },
    image: { type: String },
    keywords: { type: [String] },
    prepTime: { type: String },
    cookTime: { type: String },
    totalTime: { type: String },
    category: { type: String },
    servingSize: { type: Number },
    nutrition: { type: NutritionInformationSchema },
    video: { type: VideoObjectSchema }
});
