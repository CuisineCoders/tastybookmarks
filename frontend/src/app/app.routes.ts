import { Routes } from '@angular/router';
import { RecipeTesterComponent } from './recipe/components/tester/recipe-tester.component';
import { RecipeListComponent } from './recipe/components/list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/components/detail/recipe-detail.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/services/auth.guard';
import { SplashLayoutComponent } from './layout/splash/splash-layout.component';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { RecipeCreateComponent } from './recipe/components/create/recipe-create.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashLayoutComponent,
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
      { path: 'recipes/create', component: RecipeCreateComponent },
      { path: 'recipe-tester', component: RecipeTesterComponent },
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '/login' },
];
