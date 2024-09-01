import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {Recipe} from '../../model';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {DummyRecipeApiService, RecipeApiService} from "../../services";

@Component({
  selector: 'tasty-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: RecipeApiService, useClass: DummyRecipeApiService}]
})
export class RecipeDetailComponent implements OnInit {
  private readonly _recipeApiService = inject(RecipeApiService);

  public recipeId = input.required<string>()

  protected _recipe$!: Observable<Recipe>;

  public ngOnInit(): void {
    this._recipe$ = this._recipeApiService.getRecipe(this.recipeId());
  }
}
