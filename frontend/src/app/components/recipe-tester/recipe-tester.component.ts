import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeApiService } from '../../services';

@Component({
  selector: 'tasty-recipe-tester',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-tester.component.html',
  styleUrls: ['./recipe-tester.component.scss']
})
export class RecipeTesterComponent {
  protected recipeId = '';
  protected recipeUrl = '';

  private apiService: RecipeApiService = inject(RecipeApiService);

  protected getAllRecipes(): void {
    this.apiService.getAllRecipes().subscribe({
      next: (data) => console.log('All Recipes:', data),
      error: (error) => console.error('Error fetching all recipes:', error)
    });
  }

  protected getRecipeById(): void {
    if (!this.recipeId) return;
    this.apiService.getRecipe(this.recipeId).subscribe({
      next: (recipe) => console.log('Recipe by ID:', recipe),
      error: (error) => console.error('Error fetching recipe by ID:', error)
    });
  }

  protected addRecipe(): void {
    if (!this.recipeUrl) return;
    this.apiService.addRecipe(this.recipeUrl).subscribe({
      next: (recipe) => console.log('Added Recipe:', recipe),
      error: (error) => console.error('Error adding recipe:', error)
    });
  }

  protected deleteRecipe(): void {
    if (!this.recipeId) return;
    this.apiService.deleteRecipe(this.recipeId).subscribe({
      next: () => console.log(`Deleted Recipe with ID: ${this.recipeId}`),
      error: (error) => console.error('Error deleting recipe:', error)
    });
  }

  protected deleteAllRecipes(): void {
    this.apiService.deleteAllRecipes().subscribe({
      next: () => console.log('Deleted all recipes'),
      error: (error) => console.error('Error deleting all recipes:', error)
    });
  }

}
