import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import netlifyIdentity from 'netlify-identity-widget';

@Component({
  selector: 'tasty-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private authService: AuthService) {
    netlifyIdentity.init();
  }

  onLogin(): void {
    netlifyIdentity.open();
    console.log('Login button clicked');
    netlifyIdentity.on('login', user => console.log('login', user));
    // this.authService.login(); // Login auslösen
  }
}
