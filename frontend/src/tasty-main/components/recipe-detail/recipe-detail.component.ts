import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Recipe } from '../../model';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DummyRecipeApiService, RecipeApiService } from "../../services";
import { TastyFabControl } from "../../services/fab-control.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
import { filter, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector:        'tasty-recipe-detail',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './recipe-detail.component.html',
  styleUrl:        './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:       [{provide: RecipeApiService, useClass: DummyRecipeApiService}]
})
export class RecipeDetailComponent implements OnInit {
  private readonly _recipeApiService = inject(RecipeApiService);
  private readonly _fabControl = inject(TastyFabControl)
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  public recipeId = input.required<string>()

  protected _recipe$!: Observable<Recipe>;

  public ngOnInit(): void {

    this._fabControl.displayButtons = [
      {
        option:      'DeleteRecipeButton',
        clickAction: () => this._dialog.open(DeleteConfirmationDialogComponent).afterClosed()
                               .pipe(
                                 filter(Boolean),
                                 switchMap(() => this._recipeApiService.deleteRecipe(this.recipeId())),
                                 tap(() => this._router.navigate(['recipes'])),
                               ).subscribe()
      }
    ]
    this._recipe$ = this._recipeApiService.getRecipe(this.recipeId());
  }
}
