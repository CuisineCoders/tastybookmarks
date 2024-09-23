import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FabControlComponent } from './core/fab-control/fab-control.component';

@Component({
  selector:        'tasty-root',
  templateUrl:     './app.component.html',
  styleUrl:        './app.component.scss',
  imports: [CommonModule, RouterOutlet, RouterLink, FabControlComponent],
  standalone:      true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
