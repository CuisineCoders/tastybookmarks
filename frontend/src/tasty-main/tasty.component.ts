import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'tasty-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent],
  templateUrl: './tasty.component.html',
  styleUrl: './tasty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TastyComponent {
}
