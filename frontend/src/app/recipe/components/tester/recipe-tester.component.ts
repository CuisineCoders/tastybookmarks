import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<<< HEAD:frontend/src/app/recipe/components/tester/recipe-tester.component.ts
import { RecipeApiService } from '../../services/recipe-api.service';

@Component({
  selector:    'app-recipe-tester',
  standalone:  true,
  imports:     [CommonModule, FormsModule],
  templateUrl: './recipe-tester.component.html',
  styleUrls:   ['./recipe-tester.component.scss']
========
import { RecipeApiService } from '../../services';

@Component({
  selector: 'app-recipe-tester',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-tester.component.html',
  styleUrls: ['./recipe-tester.component.scss']
>>>>>>>> origin/jan/frontend/delete-button/detail-view:frontend/src/app/components/recipe-tester/recipe-tester.component.ts
})
export class RecipeTesterComponent {
  recipeId: string = '';
  recipeUrl: string = '';

<<<<<<<< HEAD:frontend/src/app/recipe/components/tester/recipe-tester.component.ts
  private apiService = inject(RecipeApiService);
========
  private apiService: RecipeApiService = inject(RecipeApiService);
>>>>>>>> origin/jan/frontend/delete-button/detail-view:frontend/src/app/components/recipe-tester/recipe-tester.component.ts

  getAllRecipes(): void {
    this.apiService.getAllRecipes().subscribe({
      next: (data) => console.log('All Recipes:', data),
      error: (error) => console.error('Error fetching all recipes:', error)
    });
  }

  getRecipeById(): void {
    if (!this.recipeId) return;
    this.apiService.getRecipe(this.recipeId).subscribe({
      next: (recipe) => console.log('Recipe by ID:', recipe),
      error: (error) => console.error('Error fetching recipe by ID:', error)
    });
  }

  addRecipe(): void {
    if (!this.recipeUrl) return;
    this.apiService.addRecipe(this.recipeUrl).subscribe({
      next: (recipe) => console.log('Added Recipe:', recipe),
      error: (error) => console.error('Error adding recipe:', error)
    });
  }

  deleteRecipe(): void {
    if (!this.recipeId) return;
    this.apiService.deleteRecipe(this.recipeId).subscribe({
      next: () => console.log(`Deleted Recipe with ID: ${this.recipeId}`),
      error: (error) => console.error('Error deleting recipe:', error)
    });
  }

  deleteAllRecipes(): void {
    this.apiService.deleteAllRecipes().subscribe({
      next: () => console.log('Deleted all recipes'),
      error: (error) => console.error('Error deleting all recipes:', error)
    });
  }

}
