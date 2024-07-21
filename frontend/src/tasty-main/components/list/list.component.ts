import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RecipeListEntry } from '../../models/recipe';
import { DummyRecipeApiService, RecipeApiService } from '../../services/recipe-api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tasty-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: RecipeApiService, useClass: DummyRecipeApiService}]
})
export class RecipeListComponent {
  protected _recipes$: Observable<Array<RecipeListEntry>> = inject(RecipeApiService).getAllRecipeListEntries()

}
