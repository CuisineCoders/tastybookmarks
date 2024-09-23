import { Routes } from '@angular/router';
import { RecipeDetailComponent, RecipeListComponent } from './recipe/components';
import { RecipeTesterComponent } from './recipe/components/tester/recipe-tester.component';

export const routes: Routes = [
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipe-tester', component: RecipeTesterComponent },
    { path: 'recipes/:recipeId/:recipeName', component: RecipeDetailComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
];
