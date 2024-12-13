import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationControlComponent } from '../../core/nav-control/navigation-control.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector:        'tasty-main-layout',
  templateUrl:     './main-layout.component.html',
  styleUrl:        './main-layout.component.scss',
  imports:         [CommonModule, RouterOutlet, NavigationControlComponent],
  standalone:      true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  protected readonly _screenIsSmall = inject(BreakpointObserver).observe('(max-width: 575px)')
    .pipe(map((event) => event.matches));
}
