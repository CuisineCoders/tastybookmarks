import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tasty-dialog-add-recipe',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './dialog-add.component.html',
  styleUrl: './dialog-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAddComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddComponent>);
  url: string | undefined;

  onSend(): void {
    this.dialogRef.close(this.url);
  }
}
