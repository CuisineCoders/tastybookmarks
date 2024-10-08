import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { filter, startWith, Subject, switchMap } from 'rxjs';
import { DummyRecipeApiService, RecipeApiService } from '../../services';
import { KebabCasePipe } from '../../pipes';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {TastyFabControl} from "../../services/fab-control.service";

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
  private readonly _recipeApiService = inject(RecipeApiService);
  private readonly _dialog = inject(MatDialog);

  private readonly _fetchRecipes$ = new Subject<void>();

  protected readonly _recipes$ = this._fetchRecipes$.asObservable()
    .pipe(
      takeUntilDestroyed(),
      startWith(undefined),
      switchMap(() => this._recipeApiService.getAllRecipes()),
    );

  public ngOnInit(): void {
    this._fabControl.displayButtons = [{ option: 'AddRecipeButton' }];
  }

  protected delete(id: string): void {
    this._dialog.open(DeleteConfirmationDialogComponent).afterClosed().pipe(
      filter(Boolean),
      switchMap(() => this._recipeApiService.deleteRecipe(id)),
      tap(() => this._fetchRecipes$.next()),
    ).subscribe();
  }
}
