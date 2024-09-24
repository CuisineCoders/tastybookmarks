import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KebabCasePipe } from '../../pipes';
import { RecipeApiService } from '../../services/recipe-api.service';

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
})
export class RecipeListComponent {
  protected _recipes$ = inject(RecipeApiService).getAllRecipes()
}
