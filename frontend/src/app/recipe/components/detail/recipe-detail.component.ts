import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TastyNavigationControl } from '../../../core/nav-control/navigation-control.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Recipe } from '../../model/recipe';
import { RecipeApiService } from '../../services/recipe-api.service';
import { ImportRecipeDialogComponent } from '../import-dialog/import-recipe-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { DurationFormatPipe } from '../../../shared/pipes/duration-format.pipe';

@Component({
  selector: 'tasty-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatIcon, DurationFormatPipe],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  private readonly _recipeApiService = inject(RecipeApiService);
  private readonly _navControl = inject(TastyNavigationControl);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  public recipeId = input.required<string>();

  protected _recipe$!: Observable<Recipe>;

  public ngOnInit(): void {
    this._navControl.displayButtons([
      {
        option:      'CreateRecipeButton',
        clickAction: () => this.createRecipe(),
      },
      {
        option:      'ImportRecipeButton',
        clickAction: () => this._dialog.open<ImportRecipeDialogComponent, null, string | undefined>(
          ImportRecipeDialogComponent, { width: '450px' })
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
    ]);

    this._recipe$ = this._recipeApiService.getRecipe(this.recipeId());
  }

  private createRecipe(): void {
    this._router.navigate(['recipes/create']).then(() => console.log('navigate to create'));
  }
}
