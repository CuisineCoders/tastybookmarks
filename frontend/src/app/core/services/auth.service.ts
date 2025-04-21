import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { fetchAuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticatorService = inject(AuthenticatorService);
  private readonly router = inject(Router);

  constructor() {
    this.authenticatorService.subscribe((data: any) => {
      if (data.authStatus === 'authenticated') {
        this.router.navigate(['/recipes']);
      }
    });
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      const session = await fetchAuthSession();
      return !!session.tokens?.accessToken;
    } catch {
      return false;
    }
  }  

  public async getAccessTokenFromLocalStorage() {
    let session = await fetchAuthSession();
    const clientId = session.tokens?.accessToken.payload['client_id'];
    const userId = session.tokens?.accessToken.payload['username'];

    const key = `CognitoIdentityServiceProvider.${clientId}.${userId}.accessToken`;
    const accessToken = localStorage.getItem(key);

    if (!accessToken) {
      return null;
    }

    return accessToken;
  }

  public logout(): void {
    this.authenticatorService.signOut();
    this.router.navigate(['/login']);
  }
}
