import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {Recipe} from '../../model';
import { Observable, tap } from 'rxjs';
import {CommonModule} from '@angular/common';
import { RecipeApiService } from '../../services/recipe-api.service';

@Component({
  selector: 'tasty-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  private readonly _recipeApiService = inject(RecipeApiService);

  public recipeId = input.required<string>()

  protected _recipe$!: Observable<Recipe>;

  public ngOnInit(): void {
    this._recipe$ = this._recipeApiService.getRecipe(this.recipeId());
  }
}
