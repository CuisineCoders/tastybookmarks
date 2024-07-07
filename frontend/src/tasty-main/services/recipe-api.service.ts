import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class RecipeApiService {
    private baseUrl = 'http://localhost:3000/api/recipes';

    private http: HttpClient = inject(HttpClient);

    getAllRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.baseUrl);
    }

    getRecipeById(id: string): Observable<Recipe> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Recipe>(url);
    }

    addRecipe(url: string): Observable<Recipe> {
        return this.http.post<Recipe>(this.baseUrl, { url: url });
    }

    deleteRecipe(id: string): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }

    deleteAllRecipes(): Observable<void> {
        return this.http.delete<void>(this.baseUrl);
    }
}
