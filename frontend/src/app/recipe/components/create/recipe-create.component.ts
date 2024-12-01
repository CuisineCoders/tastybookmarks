import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector:        'tasty-recipe-create',
  standalone:      true,
  imports:         [],
  templateUrl:     './recipe-create.component.html',
  styleUrl:        './recipe-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCreateComponent {
}
