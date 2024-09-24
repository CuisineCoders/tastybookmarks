import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
<<<<<<<< HEAD:frontend/src/app/recipe/components/add-dialog/add-recipe-dialog.component.ts
  selector:        'tasty-add-recipe-dialog',
  standalone:      true,
  imports:         [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, ReactiveFormsModule],
  templateUrl:     './add-recipe-dialog.component.html',
  styleUrls:       ['./add-recipe-dialog.component.scss'],
========
  selector: 'tasty-add-recipe-dialog',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss'],
>>>>>>>> origin/jan/frontend/delete-button/detail-view:frontend/src/app/components/add-recipe-dialog/add-recipe-dialog.component.ts
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipeDialogComponent {
  private regexUrlDetection = /^(?:http(s)?:\/\/)?[a-zA-ZäöüÄÖÜß0-9.-]+(?:\.[a-zA-ZäöüÄÖÜß0-9\.-]+)+[a-zA-ZäöüÄÖÜß0-9\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  protected urlFormControl = new FormControl('', [Validators.required, Validators.pattern(this.regexUrlDetection)]);
}
