import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tasty-main',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tasty-main.component.html',
  styleUrl: './tasty-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TastyMainComponent {
}
