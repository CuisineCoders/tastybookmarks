import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector:        'tasty-import-recipe-dialog',
  standalone:      true,
  imports:         [
    MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, ReactiveFormsModule,
  ],
  templateUrl:     './import-recipe-dialog.component.html',
  styleUrls:       ['./import-recipe-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportRecipeDialogComponent {
  private regexUrlDetection = /^(?:http(s)?:\/\/)?[a-zA-ZäöüÄÖÜß0-9.-]+(?:\.[a-zA-ZäöüÄÖÜß0-9\.-]+)+[a-zA-ZäöüÄÖÜß0-9\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  protected urlFormControl = new FormControl('', [Validators.required, Validators.pattern(this.regexUrlDetection)]);
}
