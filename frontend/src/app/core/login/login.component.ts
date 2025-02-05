import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../services/auth.service';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@Component({
  selector:        'tasty-login',
  standalone:      true,
  imports:         [MatButtonModule, AmplifyAuthenticatorModule],
  templateUrl:     './login.component.html',
  styleUrl:        './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  // private readonly authService = inject(AuthService);

  onLogin(): void {
    // this.authService.open()
  }
}
