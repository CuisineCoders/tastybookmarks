import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/list/list.component';
import { RecipeTesterComponent } from './components/recipe-tester/recipe-tester.component';
import { RecipeDetailComponent } from './components/detail/recipe-detail.component';

export const routes: Routes = [
    { path: '', component: RecipeListComponent },
    { path: 'recipe-tester', component: RecipeTesterComponent },
    { path: 'recipe-detail/:recipeId', component: RecipeDetailComponent },
];
