import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { isNullOrUndefined } from '../../../utils/type-checks';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector:        'tasty-recipe-create',
  standalone:      true,
  imports:         [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSuffix,
    MatButton,
    MatError,
    AsyncPipe,
  ],
  templateUrl:     './recipe-create.component.html',
  styleUrl:        './recipe-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCreateComponent {
  protected readonly ingredients = new FormArray([
    new FormControl('', Validators.required),
  ]);

  protected readonly steps = new FormArray([
    new FormControl('', Validators.required),
  ]);

  private name = new FormControl('', Validators.required);

  protected readonly createRecipeForm = new FormGroup({
    name:        this.name,
    description: new FormControl(undefined),

    servingSize: new FormControl('1', [Validators.min(1), numberValidator, Validators.required]),
    ingredients: this.ingredients,
    steps:       this.steps,

    prepTime: new FormControl(1, [Validators.min(1), numberValidator, Validators.required]),
    cookTime: new FormControl(1, [Validators.min(1), numberValidator, Validators.required]),

    protein: new FormControl(undefined, optionalNumberValidator),
    carbs:   new FormControl(undefined, optionalNumberValidator),
    fat:     new FormControl(undefined, optionalNumberValidator),

    tags:       new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
  });

  protected isNameInvalid$ = this.name.events.pipe(map(({ source }) => source.hasError('required')));
  protected servingSizeError$ = this.createRecipeForm.get('servingSize')?.events
    ?.pipe(map(({ source }) => checkForNumberMinRequiredError(source, 'Portionsgröße')));
  protected prepTimeError$ = this.createRecipeForm.get('prepTime')?.events
    ?.pipe(map(({ source }) => checkForNumberMinRequiredError(source, 'Zubereitungszeit')));
  protected cockTimeError$ = this.createRecipeForm.get('cookTime')?.events
    ?.pipe(map(({ source }) => checkForNumberMinRequiredError(source, 'Kochzeit')));

  protected save(): void {
    console.log(`Save recipe: ${JSON.stringify(this.createRecipeForm.value)}`);
  }
}

const checkForNumberMinRequiredError = (source: AbstractControl, entity: string): string | undefined => [
  { error: 'required', message: `Du musst eine ${entity} angeben!` },
  { error: 'min', message: `Du kannst keine kleinere ${entity} als 1 angeben!` },
].find(({ error }) => source.hasError(error))?.message;

const numberValidator = Validators.pattern(/^\d+$/);
const optionalNumberValidator = (control: AbstractControl) => isNullOrUndefined(control.value) ? null : numberValidator(
  control);
