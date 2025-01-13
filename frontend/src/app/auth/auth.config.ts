import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
              authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_btB1jIcvb',
              redirectUrl: 'https://frontend-login--tastybookmarks.netlify.app/login',
              postLogoutRedirectUri: window.location.origin,
              clientId: '21576l0d4q7bfgnc4b8jpd0v3v',
              scope: 'openid profile email', // 'openid profile offline_access ' + your scopes
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
          }
}