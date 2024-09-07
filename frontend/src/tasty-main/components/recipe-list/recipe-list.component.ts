import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {DummyRecipeApiService, RecipeApiService} from '../../services';
import {KebabCasePipe} from '../../pipes';
import {Recipe} from "../../model";
import {TastyFabControl} from "../../services/fab-control.service";

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
export class RecipeListComponent implements OnInit {
  private readonly _fabControl = inject(TastyFabControl)

  protected _recipes$: Observable<Array<Recipe>> = inject(RecipeApiService).getAllRecipes()

  public ngOnInit(): void {
    this._fabControl.displayButtons = [{option: 'AddRecipeButton'}]
  }
}
