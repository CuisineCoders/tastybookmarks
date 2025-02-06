import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../services/auth.service';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_btB1jIcvb',
      userPoolClientId: '21576l0d4q7bfgnc4b8jpd0v3v',
    }
  }
});

@Component({
  selector:        'tasty-login',
  standalone:      true,
  imports:         [MatButtonModule, AmplifyAuthenticatorModule],
  templateUrl:     './login.component.html',
  styleUrl:        './login.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  // private readonly authService = inject(AuthService);

  onLogin(): void {
    // this.authService.open()
  }
}
