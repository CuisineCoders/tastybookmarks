import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, translations } from '@aws-amplify/ui-angular';

import { I18n } from 'aws-amplify/utils';

I18n.putVocabularies(translations);
I18n.setLanguage('de');

I18n.putVocabularies({
  de: {
    'Please confirm your Password': 'Bitte bestätige dein Passwort',
    'Enter your code':              'Gib deinen Code ein',
    'Enter your Confirmation Code': 'Gib deinen Bestätigungs-Code ein',
    'Enter your Email':             'Gib deine E-Mail ein',
    'Enter your email':             'Gib deine E-Mail ein',
    'Enter your Password':          'Gib dein Passwort ein',
    'Reset Password':               'Passwort zurücksetzen',
    'Your code is on the way. To log in, enter the code we emailed to':
                                    'Dein Bestätigungscode ist unterwegs. Um dich einzuloggen gib den Code ein, der gerade per E-Mail rausging an ',
  },
});

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId:       'eu-north-1_btB1jIcvb',
      userPoolClientId: '21576l0d4q7bfgnc4b8jpd0v3v',
      loginWith:        { 
        email: true,
        oauth: {
          domain: 'eu-north-1btb1jicvb.auth.eu-north-1.amazoncognito.com',
          scopes: ['openid', 'email'],
          redirectSignIn: ['http://localhost:4200/recipes','https://tastybookmarks.netlify.app/recipes'],
          redirectSignOut: ['http://localhost:4200/login','https://tastybookmarks.netlify.app/login'],
          responseType: 'code',
          providers: ['Google'],
        }
      },
    },
  },
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
  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // constructor() {
  //   setTimeout(() => this.changeDetectorRef.detectChanges());
  // }
}
