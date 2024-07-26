import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tasty-add-recipe-dialog',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule],
  templateUrl: './add-recipe-dialog.component.html',
  styleUrl: './add-recipe-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddRecipeDialogComponent>);
  url: string | undefined;
}
