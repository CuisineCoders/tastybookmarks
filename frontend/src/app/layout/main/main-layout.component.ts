import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationControlComponent } from '../../core/nav-control/navigation-control.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'tasty-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  imports: [CommonModule, RouterOutlet, NavigationControlComponent, MatDivider, MatIconButton, MatIcon],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  protected readonly authService = inject(AuthService);

  protected readonly _screenIsSmall = inject(BreakpointObserver).observe('(max-width: 575px)')
    .pipe(map((event) => event.matches));

  protected logout(): void {
    this.authService.logout();
  }
}
