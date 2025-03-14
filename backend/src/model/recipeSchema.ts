import { Schema } from 'mongoose';
import { NutritionInformation, Recipe, VideoObject } from './recipe';


const NutritionInformationSchema: Schema = new Schema<NutritionInformation>({
    servingSize:         {type: Number},
    calories:            String,
    proteinContent:      String,
    fatContent:          String,
    carbohydrateContent: String
});

const VideoObjectSchema: Schema = new Schema<VideoObject>({
    name:         {type: String, required: true},
    contentUrl:   {type: String, required: true},
    description:  String,
    thumbnailUrl: String,
    embedUrl:     String,
    uploadDate:   String
});

export const RecipeSchema: Schema = new Schema<Recipe>({
    url:          {type: String, required: true},
    name:         {type: String, required: true},
    ingredients:  {type: [String], required: true},
    instructions: {type: [[String]], required: true},
    description:  String,
    imageUrl:     String,
    keywords:     {type: [String]},
    prepTime:     String,
    cookTime:     String,
    totalTime:    String,
    category:     String,
    servingSize:  {type: Number},
    nutrition:    {type: NutritionInformationSchema},
    video:        {type: VideoObjectSchema}
}, {timestamps: true});

