import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { AddRecipeDialogComponent } from './components';
import { RecipeApiService } from './services/recipe-api.service';

@Component({
  selector:        'tasty-root',
  standalone:      true,
  imports:         [CommonModule, RouterOutlet, RouterLink, MatButtonModule, MatIconModule],
  templateUrl:     './app.component.html',
  styleUrl:        './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _dialog = inject(MatDialog);
  private readonly _recipeApiService = inject(RecipeApiService);

  public openDialog(): void {
    this._dialog.open<AddRecipeDialogComponent, null, string | undefined>(AddRecipeDialogComponent, { width: '450px' })
      .afterClosed()
      .pipe(
        filter(event => event !== undefined),
        switchMap((url) => this._recipeApiService.addRecipe(url),
        ),
      )
      .subscribe();
  }
}
