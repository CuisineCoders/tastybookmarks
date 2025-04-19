import { Routes } from '@angular/router';
import { RecipeTesterComponent } from './recipe/components/tester/recipe-tester.component';
import { RecipeListComponent } from './recipe/components/list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/components/detail/recipe-detail.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/services/auth.guard';
import { MainLayoutComponent } from './layout/main/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:recipeId/:recipeName', component: RecipeDetailComponent },
      { path: 'recipe-tester', component: RecipeTesterComponent },
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '/login' },
];

