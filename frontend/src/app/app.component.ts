import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

@Component({
  selector: 'tasty-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AmplifyAuthenticatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: 'eu-north-1_btB1jIcvb',
          userPoolClientId: '21576l0d4q7bfgnc4b8jpd0v3v',
        }
      }
    });
  }
}
