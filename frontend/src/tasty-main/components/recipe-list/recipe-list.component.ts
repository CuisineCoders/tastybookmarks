import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {DummyRecipeApiService, RecipeApiService} from '../../services/recipe-api.service';
import {KebabCasePipe} from '../../pipes/kebab-case.pipe';
import {RecipePreview} from "../../model/recipe";

@Component({
  selector: 'tasty-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    KebabCasePipe
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: RecipeApiService, useClass: DummyRecipeApiService}]
})
export class RecipeListComponent {
  protected _recipes$: Observable<Array<RecipePreview>> = inject(RecipeApiService).getAllRecipes()
}
