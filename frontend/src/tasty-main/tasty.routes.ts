import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeTesterComponent } from './components/recipe-tester/recipe-tester.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

export const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe-tester', component: RecipeTesterComponent },
  { path: 'recipes/:recipeId/:recipeName', component: RecipeDetailComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];
