import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';

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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, { width: '450px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('URL:', result);
      }
    });
  }
}
