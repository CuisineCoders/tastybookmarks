import { Routes } from '@angular/router';
import { RecipeTesterComponent } from './recipe/components/tester/recipe-tester.component';
import { RecipeListComponent } from './recipe/components/list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/components/detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipe/components/create/recipe-create.component';

export const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe-tester', component: RecipeTesterComponent },
  { path: 'recipes/:recipeId/:recipeName', component: RecipeDetailComponent },
  { path: 'recipes/create', component: RecipeCreateComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];
