import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'tasty-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './tasty.component.html',
  styleUrl: './tasty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TastyComponent {
}
