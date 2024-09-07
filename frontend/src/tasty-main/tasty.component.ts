import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AddRecipeDialogComponent} from './components';
import {TastyFabControl} from "./services/fab-control.service";

@Component({
  selector: 'tasty-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './tasty.component.html',
  styleUrl: './tasty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TastyComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly displayButtons = inject(TastyFabControl).displayButtons

  protected openDialog(): void {
    this.dialog.open<AddRecipeDialogComponent, null, string | undefined>(AddRecipeDialogComponent, {width: '450px'})
      .afterClosed()
      .pipe(filter(event => event !== undefined))
      .subscribe(result => console.log('URL:', result));
  }
}
