import { Routes } from '@angular/router';
import { RecipeTesterComponent } from './recipe/components/tester/recipe-tester.component';
import { RecipeListComponent } from './recipe/components/list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/components/detail/recipe-detail.component';

export const routes: Routes = [
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipe-tester', component: RecipeTesterComponent },
    { path: 'recipes/:recipeId/:recipeName', component: RecipeDetailComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
];
