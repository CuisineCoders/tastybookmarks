import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector:        'tasty-login',
  standalone:      true,
  imports:         [MatButtonModule],
  templateUrl:     './login.component.html',
  styleUrl:        './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  onLogin(): void {
    this.authService.login();
  }
}
