import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RecipeTesterComponent } from './components/recipe-tester/recipe-tester.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'recipe-tester', component: RecipeTesterComponent },
];
