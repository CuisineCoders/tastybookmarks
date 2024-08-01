import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Recipe, RecipeListEntry } from '../models/recipe';

@Injectable({
    providedIn: 'root'
})
export class RecipeApiService {
    private baseUrl = 'http://localhost:3000/api/recipes';

    private http: HttpClient = inject(HttpClient);

    public getAllRecipes(): Observable<Array<RecipeListEntry>> {
        return this.http.get<Recipe[]>(this.baseUrl);
    }

    public getRecipe(id: string): Observable<Recipe> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Recipe>(url);
    }

    public addRecipe(url: string): Observable<Recipe> {
        return this.http.post<Recipe>(this.baseUrl, { url: url });
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
    public getAllRecipes(): Observable<Array<RecipeListEntry>> {
        return of([
            { id: '1', name: 'Vegetarische Tacos', },
            { id: '2', name: 'Süßkartoffel-Curry mit Kokosmilch', },
            { id: '3', name: 'Schokoladenmousse mit Himbeeren', },
            { id: '4', name: 'Gemüse-Tempura', },
            { id: '5', name: 'Mango-Chia-Pudding', },
            { id: '6', name: 'Zucchini-Fritters', }
        ]);
    }

    public getRecipe(id: string): Observable<Recipe> {
        const dummyRecipe = [
            {
                id: '1',
                name: 'Vegetarische Tacos',
                ingredients: [
                    { name: 'Tortilla', amount: { value: 4 } },
                    { name: 'Black Beans', amount: { unit: 'cup', value: 1 } },
                    { name: 'Corn', amount: { unit: 'cup', value: 1 } },
                    { name: 'Avocado', amount: { value: 1 } },
                    { name: 'Tomato', amount: { value: 2 } },
                    { name: 'Lettuce', amount: { unit: 'cups', value: 2 } },
                ],
                instructions: [
                    "Warm the tortillas in a pan.",
                    "Mash the avocado and season with salt and pepper.",
                    "Fill the tortillas with black beans, corn, diced tomatoes, and lettuce.",
                    "Top with mashed avocado and serve."
                ],
                data: {}
            },
            {
                id: '2',
                name: 'Süßkartoffel-Curry mit Kokosmilch',
                ingredients: [
                    { name: 'Sweet Potatoes', amount: { value: 2 } },
                    { name: 'Coconut Milk', amount: { unit: 'ml', value: 400 } },
                    { name: 'Onion', amount: { value: 1 } },
                    { name: 'Garlic', amount: { unit: 'cloves', value: 2 } },
                    { name: 'Curry Powder', amount: { unit: 'tbsp', value: 1 } },
                    { name: 'Spinach', amount: { unit: 'cups', value: 2 } },
                ],
                instructions: [
                    "Peel and dice the sweet potatoes.",
                    "In a pot, sauté the chopped onion and garlic until soft.",
                    "Add the sweet potatoes and curry powder, cook for 5 minutes.",
                    "Pour in the coconut milk and simmer until the sweet potatoes are tender.",
                    "Add the spinach and cook until wilted. Serve hot."
                ],
                data: {}
            },
            {
                id: '3',
                name: 'Schokoladenmousse mit Himbeeren',

                ingredients: [
                    { name: 'Dark Chocolate', amount: { unit: 'g', value: 200 } },
                    { name: 'Heavy Cream', amount: { unit: 'ml', value: 300 } },
                    { name: 'Eggs', amount: { value: 3 } },
                    { name: 'Sugar', amount: { unit: 'tbsp', value: 2 } },
                    { name: 'Raspberries', amount: { unit: 'cup', value: 1 } },
                ],
                instructions: [
                    "Melt the dark chocolate over a double boiler.",
                    "Whip the heavy cream until stiff peaks form.",
                    "Separate the eggs and whisk the yolks with sugar until creamy.",
                    "Fold the melted chocolate into the egg yolk mixture.",
                    "Gently fold in the whipped cream and refrigerate for 2 hours.",
                    "Serve with fresh raspberries on top."
                ],
                data: {}
            },
            {
                id: '4',
                name: 'Gemüse-Tempura',
                ingredients: [
                    { name: 'Carrots', amount: { value: 2 } },
                    { name: 'Bell Peppers', amount: { value: 2 } },
                    { name: 'Zucchini', amount: { value: 1 } },
                    { name: 'Tempura Batter Mix', amount: { unit: 'g', value: 200 } },
                    { name: 'Oil for frying', amount: { unit: 'cups', value: 2 } },
                ],
                instructions: [
                    "Slice the vegetables into thin strips.",
                    "Prepare the tempura batter mix according to package instructions.",
                    "Heat the oil in a deep pan.",
                    "Dip the vegetables into the batter and fry until golden brown.",
                    "Drain on paper towels and serve immediately."
                ],
                data: {}
            },
            {
                id: '5',
                name: 'Mango-Chia-Pudding',
                ingredients: [
                    { name: 'Mango', amount: { value: 1 } },
                    { name: 'Chia Seeds', amount: { unit: 'tbsp', value: 4 } },
                    { name: 'Coconut Milk', amount: { unit: 'ml', value: 250 } },
                    { name: 'Honey', amount: { unit: 'tbsp', value: 2 } },
                ],
                instructions: [
                    "Peel and blend the mango until smooth.",
                    "In a bowl, mix chia seeds with coconut milk and honey.",
                    "Stir in the mango puree.",
                    "Refrigerate for at least 4 hours or overnight.",
                    "Serve chilled, topped with fresh mango slices if desired."
                ],
                data: {}
            },
            {
                id: '6',
                name: 'Zucchini-Fritters',
                ingredients: [
                    { name: 'Zucchini', amount: { value: 2 } },
                    { name: 'Egg', amount: { value: 1 } },
                    { name: 'Flour', amount: { unit: 'cup', value: 1 / 2 } },
                    { name: 'Parmesan Cheese', amount: { unit: 'cup', value: 1 / 4 } },
                    { name: 'Salt', amount: { unit: 'tsp', value: 1 / 2 } },
                    { name: 'Pepper', amount: { unit: 'tsp', value: 1 / 4 } },
                    { name: 'Oil for frying', amount: { unit: 'tbsp', value: 2 } },
                ],
                instructions: [
                    "Grate the zucchini and squeeze out excess moisture.",
                    "In a bowl, mix the zucchini with egg, flour, Parmesan cheese, salt, and pepper.",
                    "Heat oil in a frying pan over medium heat.",
                    "Drop spoonfuls of the mixture into the pan and flatten slightly.",
                    "Cook until golden brown on both sides. Serve warm."
                ],
                data: {}
            }
        ].find((entry) => entry.id === id)!

        return of(dummyRecipe);
    }

    public addRecipe(url: string): Observable<Recipe> {
        throw new Error('Method not implemented.');
    }

    public deleteRecipe(id: string): Observable<void> {
        throw new Error('Method not implemented.');
    }

    public deleteAllRecipes(): Observable<void> {
        throw new Error('Method not implemented.');
    }

}
