import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private readonly baseUrl = 'http://localhost:3000/api/recipes';

  private http: HttpClient = inject(HttpClient);

  public getAllRecipes(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>(this.baseUrl);
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  public addRecipe(url: string): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, {url});
  }

  public deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  public deleteAllRecipes(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}
