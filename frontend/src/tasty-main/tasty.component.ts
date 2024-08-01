import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from './components/add-recipe-dialog/add-recipe-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'tasty-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule],
  templateUrl: './tasty.component.html',
  styleUrl: './tasty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TastyComponent {
  readonly dialog = inject(MatDialog);

  public openDialog(): void {
    this.dialog.open<AddRecipeDialogComponent, null, string | undefined>(AddRecipeDialogComponent, { width: '450px' })
      .afterClosed()
      .pipe(filter(event => event !== undefined))
      .subscribe(result => console.log('URL:', result));
  }
}
