import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TastyFabControl } from '../../../core/fab-control/fab-control.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Recipe } from '../../model/recipe';
import { RecipeApiService } from '../../services/recipe-api.service';
import { AddRecipeDialogComponent } from '../add-dialog/add-recipe-dialog.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'tasty-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  private readonly _recipeApiService = inject(RecipeApiService);
  private readonly _fabControl = inject(TastyFabControl);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  public recipeId = input.required<string>();

  protected _recipe$!: Observable<Recipe>;

  public ngOnInit(): void {
    this._fabControl.displayButtons = [
      {
        option:      'AddRecipeButton',
        clickAction: () => this._dialog.open<AddRecipeDialogComponent, null, string | undefined>(
          AddRecipeDialogComponent, { width: '450px' })
          .afterClosed()
          .pipe(
            filter(event => event !== undefined),
            switchMap(result => this._recipeApiService.addRecipe(result)),
          )
          .subscribe(),
      },
      {
        option: 'DeleteRecipeButton',
        clickAction: () => this._dialog.open(DeleteConfirmationDialogComponent).afterClosed()
          .pipe(
            filter(Boolean),
            switchMap(() => this._recipeApiService.deleteRecipe(this.recipeId())),
            tap(() => this._router.navigate(['recipes'])),
          ).subscribe(),
      },
    ];

    this._recipe$ = this._recipeApiService.getRecipe(this.recipeId());
  }
}
