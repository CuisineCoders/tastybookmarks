import {
  AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { isNullOrUndefined } from '../../../utils/type-checks';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AutoFocusDirective } from '../../../shared/directives/auto-focus';

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
    MatButton,
    MatError,
    AsyncPipe,
    AutoFocusDirective,
  ],
  templateUrl:     './recipe-create.component.html',
  styleUrl:        './recipe-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCreateComponent {
  protected readonly ingredients = new FormArray([
    new FormControl<string>('', Validators.required),
  ]);

  protected readonly instructions = new FormArray([
    new FormControl<string>('', Validators.required),
  ]);


  protected readonly createRecipeForm = new FormGroup({
    name:        new FormControl<string>('', Validators.required),
    description: new FormControl<string|undefined>(undefined),

    servingSize: new FormControl<number>(1, [Validators.min(1), numberValidator, Validators.required]),
    ingredients: this.ingredients,
    steps:       this.instructions,

    prepTime: new FormControl<number>(1, [Validators.min(1), numberValidator, Validators.required]),
    cookTime: new FormControl<number>(1, [Validators.min(1), numberValidator, Validators.required]),

    protein: new FormControl<number | undefined>(undefined, optionalNumberValidator),
    carbs:   new FormControl<number | undefined>(undefined, optionalNumberValidator),
    fat:     new FormControl<number | undefined>(undefined, optionalNumberValidator),

    tags:       new FormControl('', Validators.required),
    categories: new FormControl('', Validators.required),
  });

  protected isNameInvalid$ = this.createRecipeForm.get('name')!.events.pipe(
    map(({ source }) => source.hasError('required')));
  protected servingSizeError$ = this.createRecipeForm.get('servingSize')!.events
    ?.pipe(map(({ source }) => checkForNumberMinRequiredError(source, 'Portionsgröße')));
  protected prepTimeError$ = this.createRecipeForm.get('prepTime')!.events
    ?.pipe(map(({ source }) => checkForNumberMinRequiredError(source, 'Zubereitungszeit')));
  protected cockTimeError$ = this.createRecipeForm.get('cookTime')!.events
    ?.pipe(map(({ source }) => checkForNumberMinRequiredError(source, 'Kochzeit')));

  protected focusInput = {ingredients: false, instructions: false}

  protected save(): void {
    console.log(`Save recipe: ${JSON.stringify(this.createRecipeForm.value)}`);
  }

  protected addIngredient(): void {
    this.ingredients.push(new FormControl<string>('', Validators.required));
    this.focusInput = {ingredients: true, instructions: false}
  }

  protected deleteIngredient(index: number): void {
    this.ingredients.removeAt(index);
    this.focusInput = {ingredients: true, instructions: false}
  }

  protected addInstruction(): void {
    this.instructions.push(new FormControl('', Validators.required));
    this.focusInput = {ingredients: false, instructions: true}
  }

  protected deleteInstruction(index: number): void {
    this.instructions.removeAt(index);
    this.focusInput = {ingredients: false, instructions: true}
  }
}

const checkForNumberMinRequiredError = (source: AbstractControl, entity: string): string | undefined => [
  { error: 'required', message: `Du musst eine ${entity} angeben!` },
  { error: 'min', message: `Du kannst keine kleinere ${entity} als 1 angeben!` },
].find(({ error }) => source.hasError(error))?.message;

const numberValidator = Validators.pattern(/^\d+$/);
const optionalNumberValidator = (control: AbstractControl) => isNullOrUndefined(control.value) ? null : numberValidator(
  control);
