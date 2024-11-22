import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FabControlComponent } from './core/fab-control/fab-control.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector:        'tasty-root',
  templateUrl:     './app.component.html',
  styleUrl:        './app.component.scss',
  imports:         [CommonModule, RouterOutlet, RouterLink, FabControlComponent],
  standalone:      true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly _screenIsSmall = inject(BreakpointObserver).observe('(max-width: 575px)')
    .pipe(map((event) => event.matches));
}
