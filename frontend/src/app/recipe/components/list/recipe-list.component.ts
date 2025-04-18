import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { filter, startWith, Subject, switchMap } from 'rxjs';
import { TastyNavigationControl } from '../../../core/nav-control/navigation-control.service';
import { KebabCasePipe } from '../../../shared/pipes/kebab-case.pipe';
import { RecipeApiService } from '../../services/recipe-api.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { AddRecipeDialogComponent } from '../add-dialog/add-recipe-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

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
})
export class RecipeListComponent implements OnInit {
  private readonly navControl = inject(TastyNavigationControl);
  private readonly recipeApiService = inject(RecipeApiService);
  private readonly dialog = inject(MatDialog);

  private readonly fetchRecipes$ = new Subject<void>();
  protected readonly _recipes$ = this.fetchRecipes$.asObservable()
    .pipe(
      takeUntilDestroyed(),
      startWith(undefined),
      switchMap(() => this.recipeApiService.getAllRecipes()),
    );

  public ngOnInit(): void {
    this.navControl.displayButtons = [
      {
        option:      'AddRecipeButton',
        clickAction: () => this.dialog.open<AddRecipeDialogComponent, null, string | undefined>(
          AddRecipeDialogComponent, { width: '450px' })
          .afterClosed()
          .pipe(
            filter(event => event !== undefined),
            switchMap(result => this.recipeApiService.addRecipe(result)),
            tap(() => this.fetchRecipes$.next()),
          )
          .subscribe(),
      },
    ];
  }

  protected delete(id: string): void {
    this.dialog.open(DeleteConfirmationDialogComponent).afterClosed().pipe(
      filter(Boolean),
      switchMap(() => this.recipeApiService.deleteRecipe(id)),
      tap(() => this.fetchRecipes$.next()),
    ).subscribe();
  }
}
