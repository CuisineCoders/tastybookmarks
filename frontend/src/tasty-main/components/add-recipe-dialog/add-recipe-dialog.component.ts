import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'tasty-add-recipe-dialog',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipeDialogComponent {
  private regEx = /^(?:http(s)?:\/\/)?[a-zA-ZäöüÄÖÜß0-9.-]+(?:\.[a-zA-ZäöüÄÖÜß0-9\.-]+)+[a-zA-ZäöüÄÖÜß0-9\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  protected urlFormControl = new FormControl('', [Validators.required, Validators.pattern(this.regEx)]);
  protected matcher = new MyErrorStateMatcher();
}
