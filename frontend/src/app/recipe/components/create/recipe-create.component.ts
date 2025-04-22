import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector:        'tasty-recipe-create',
  standalone:      true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSuffix,
  ],
  templateUrl:     './recipe-create.component.html',
  styleUrl:        './recipe-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCreateComponent {

  protected metaDataForm = new FormGroup({});
  protected createRecipeForm = new FormGroup({});
}
