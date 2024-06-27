import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { RecipeTesterComponent } from './recipe-tester/recipe-tester.component';

@Component({
  selector: 'tasty-root',
  standalone: true,
  imports: [RouterOutlet, RecipeTesterComponent],
  templateUrl: './tasty.component.html',
  styleUrl: './tasty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TastyComponent {
}
