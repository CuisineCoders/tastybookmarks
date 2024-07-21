export interface RecipeIngredientQuantities {
    unit?: string;
    value: number;
}

export interface RecipeIngredient {
    amount: RecipeIngredientQuantities;
    name: string;
}

export interface Recipe {
    id: string;
    name: string;
    imgUrl?: string;
    ingredients: Array<RecipeIngredient>;
    instructions: Array<string>;
    data: any;
}

export interface RecipeListEntry extends Pick<Recipe, 'id' | 'name' | 'imgUrl'> {}
