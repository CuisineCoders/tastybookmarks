import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DummyRecipeApiService, RecipeApiService } from '../../services';
import { KebabCasePipe } from '../../pipes';
import { Recipe } from '../../model';
import { TastyFabControl } from '../../services/fab-control.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector:        'tasty-list',
  standalone:      true,
  imports:         [
    CommonModule,
    RouterLink,
    KebabCasePipe,
    MatIcon,
    MatIconButton,
  ],
  templateUrl:     './recipe-list.component.html',
  styleUrl:        './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:       [{ provide: RecipeApiService, useClass: DummyRecipeApiService }],
})
export class RecipeListComponent implements OnInit {
  private readonly _fabControl = inject(TastyFabControl);

  protected _recipes$: Observable<Array<Recipe>> = inject(RecipeApiService).getAllRecipes();

  public ngOnInit(): void {
    this._fabControl.displayButtons = [{ option: 'AddRecipeButton' }];
  }

  protected delete(id: string): void {
    console.log('delete ' + id);
  }
}
