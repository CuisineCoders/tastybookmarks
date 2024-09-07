import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Recipe} from '../model';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private baseUrl = 'http://localhost:3000/api/recipes';

  private http: HttpClient = inject(HttpClient);

  public getAllRecipes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(this.baseUrl);
  }

  public getRecipe(id: string): Observable<Recipe> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Recipe>(url);
  }

  public addRecipe(url: string): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, {url: url});
  }

  public deleteRecipe(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  public deleteAllRecipes(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}

@Injectable()
export class DummyRecipeApiService {
  public getAllRecipes(): Observable<Array<Recipe>> {
    return of(MockRecipes);
  }

  public getRecipe(id: string): Observable<Recipe> {
    return of(MockRecipes.find((entry) => entry.id === id)!);
  }

  public addRecipe(url: string): Observable<Recipe> {
    throw new Error('Method not implemented.');
  }

  public deleteRecipe(id: string): Observable<void> {
    return of(console.log(`Delete recipe ${id}...`));
  }

  public deleteAllRecipes(): Observable<void> {
    throw new Error('Method not implemented.');
  }

}

const MockRecipes = [
  {
    id: "1",
    url: "https://example.com/recipe1",
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta with creamy sauce and pancetta.",
    keywords: ["pasta", "Italian", "creamy"],
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    totalTime: "35 minutes",
    category: "Main Course",
    ingredient: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Parmesan cheese",
      "2 cloves garlic",
      "Salt and pepper"
    ],
    instructions: [[
      "Cook spaghetti according to package instructions.",
      "Fry pancetta with garlic until crispy.",
      "Beat eggs and mix with Parmesan.",
      "Combine hot pasta with pancetta, remove from heat, then stir in egg mixture.",
      "Serve immediately."
    ]],
    servingSize: 4,
    nutrition: {
      calories: "600 kcal",
      proteinContent: "25g",
      fatContent: "30g",
      carbohydrateContent: "60g"
    }
  },
  {
    id: "2",
    url: "https://example.com/recipe2",
    name: "Chicken Salad",
    description: "A refreshing salad with grilled chicken and vegetables.",
    imageUrl: "https://img.chefkoch-cdn.de/rezepte/1104411216466401/bilder/1318182/crop-642x428/lammkoteletts-im-tomaten-olivenoel-sud-mit-zweierlei-bohnen-und-kartoffelvierteln.jpg",
    keywords: ["salad", "chicken", "healthy"],
    prepTime: "20 minutes",
    totalTime: "20 minutes",
    category: "Salad",
    ingredient: [
      "2 chicken breasts",
      "Mixed salad greens",
      "1 cucumber",
      "Cherry tomatoes",
      "1 avocado",
      "Olive oil",
      "Lemon juice",
      "Salt and pepper"
    ],
    instructions: [
      [
        "Grill chicken breasts and slice them.",
        "Chop vegetables and mix with salad greens.",
      ],
      [
        "Top with grilled chicken and dress with olive oil and lemon juice.",
        "Season with salt and pepper."
      ]],
    servingSize: 2
  },
  {
    id: "3",
    url: "https://example.com/recipe3",
    name: "Vegetable Stir Fry",
    description: "Quick and easy stir-fried vegetables with soy sauce.",
    keywords: ["vegetarian", "stir-fry", "quick"],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    totalTime: "25 minutes",
    category: "Side Dish",
    ingredient: [
      "1 bell pepper",
      "1 carrot",
      "1 cup broccoli florets",
      "2 tablespoons soy sauce",
      "1 tablespoon sesame oil",
      "2 cloves garlic",
      "1 teaspoon ginger"
    ],
    instructions: [[
      "Chop vegetables into bite-sized pieces.",
      "Heat sesame oil in a pan and sauté garlic and ginger.",
      "Add vegetables and stir-fry until tender-crisp.",
      "Add soy sauce and cook for another minute.",
      "Serve hot."
    ]],
    servingSize: 4
  },
  {
    id: "4",
    url: "https://example.com/recipe4",
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with a creamy frosting.",
    keywords: ["dessert", "chocolate", "cake"],
    prepTime: "20 minutes",
    cookTime: "35 minutes",
    totalTime: "55 minutes",
    category: "Dessert",
    ingredient: [
      "200g sugar",
      "175g flour",
      "75g cocoa powder",
      "1 teaspoon baking powder",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 large eggs",
      "120ml milk",
      "60ml vegetable oil",
      "2 teaspoons vanilla extract",
      "120ml boiling water"
    ],
    instructions: [[
      "Preheat oven to 180°C (350°F).",
      "Mix dry ingredients in one bowl and wet ingredients in another.",
      "Combine both mixtures and add boiling water.",
      "Pour into a greased cake pan and bake for 30-35 minutes.",
      "Let cool before frosting."
    ]],
    servingSize: 8
  },
  {
    id: "5",
    url: "https://example.com/recipe5",
    name: "Beef Tacos",
    description: "Tasty beef tacos with fresh toppings.",
    keywords: ["tacos", "beef", "Mexican"],
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    totalTime: "25 minutes",
    category: "Main Course",
    ingredient: [
      "500g ground beef",
      "Taco seasoning",
      "Taco shells",
      "Shredded lettuce",
      "Diced tomatoes",
      "Grated cheese",
      "Sour cream"
    ],
    instructions: [[
      "Cook ground beef with taco seasoning.",
      "Warm taco shells according to package instructions.",
      "Fill taco shells with beef and top with lettuce, tomatoes, cheese, and sour cream.",
      "Serve immediately."
    ]],
    servingSize: 4
  },
  {
    id: "6",
    url: "https://example.com/recipe6",
    name: "Greek Yogurt Parfait",
    description: "A delicious parfait with Greek yogurt, fruit, and granola.",
    keywords: ["breakfast", "healthy", "yogurt"],
    prepTime: "10 minutes",
    totalTime: "10 minutes",
    category: "Breakfast",
    ingredient: [
      "1 cup Greek yogurt",
      "1/2 cup granola",
      "1/2 cup mixed berries",
      "1 tablespoon honey"
    ],
    instructions: [[
      "Layer Greek yogurt, granola, and berries in a glass.",
      "Drizzle with honey on top.",
      "Serve immediately."
    ]],
    servingSize: 1
  },
  {
    id: "7",
    url: "https://example.com/recipe7",
    name: "Tomato Soup",
    description: "Classic tomato soup with a hint of basil.",
    keywords: ["soup", "tomato", "comfort food"],
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    totalTime: "40 minutes",
    category: "Soup",
    ingredient: [
      "1 onion",
      "2 cloves garlic",
      "1 can crushed tomatoes",
      "2 cups vegetable broth",
      "1 teaspoon dried basil",
      "Salt and pepper"
    ],
    instructions: [[
      "Sauté onion and garlic in a pot.",
      "Add crushed tomatoes, broth, and basil.",
      "Simmer for 30 minutes.",
      "Blend until smooth and season with salt and pepper."
    ]],
    servingSize: 4
  },
  {
    id: "8",
    url: "https://example.com/recipe8",
    name: "Pancakes",
    description: "Fluffy pancakes perfect for breakfast.",
    keywords: ["breakfast", "pancakes", "easy"],
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    totalTime: "30 minutes",
    category: "Breakfast",
    ingredient: [
      "1 cup flour",
      "2 tablespoons sugar",
      "1 tablespoon baking powder",
      "1/2 teaspoon salt",
      "1 cup milk",
      "1 egg",
      "2 tablespoons melted butter"
    ],
    instructions: [[
      "Mix dry ingredients in one bowl and wet ingredients in another.",
      "Combine and cook on a hot griddle or pan.",
      "Serve with your favorite toppings."
    ]],
    servingSize: 4
  },
  {
    id: "9",
    url: "https://example.com/recipe9",
    name: "Garlic Shrimp",
    description: "Juicy shrimp sautéed in garlic and butter.",
    keywords: ["seafood", "shrimp", "garlic"],
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    totalTime: "20 minutes",
    category: "Appetizer",
    ingredient: [
      "500g shrimp",
      "4 cloves garlic",
      "3 tablespoons butter",
      "2 tablespoons olive oil",
      "Salt and pepper",
      "Chopped parsley"
    ],
    instructions: [[
      "Sauté garlic in butter and olive oil.",
      "Add shrimp and cook until pink and opaque.",
      "Season with salt and pepper, and sprinkle with parsley."
    ]],
    servingSize: 4
  },
  {
    id: "10",
    url: "https://example.com/recipe10",
    name: "Quiche Lorraine",
    description: "Savory quiche with bacon and cheese.",
    keywords: ["quiche", "bacon", "cheese"],
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    totalTime: "60 minutes",
    category: "Brunch",
    ingredient: [
      "1 pie crust",
      "200g bacon",
      "1 cup shredded Swiss cheese",
      "4 large eggs",
      "1 cup heavy cream",
      "Salt and pepper"
    ],
    instructions: [[
      "Preheat oven to 180°C (350°F).",
      "Cook bacon until crispy and crumble.",
      "Whisk eggs and mix with cream, salt, and pepper.",
      "Spread bacon and cheese in pie crust, then pour egg mixture on top.",
      "Bake for 35-40 minutes or until set."
    ]],
    servingSize: 6
  }
]
