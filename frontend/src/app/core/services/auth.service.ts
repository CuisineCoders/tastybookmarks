import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import netlifyIdentity, { User } from 'netlify-identity-widget';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private isLoggedIn = false;

  constructor() {
    netlifyIdentity.init();
    netlifyIdentity.on('login', () => this.login());
    netlifyIdentity.on('logout', () => (this.isLoggedIn = false));
  }

  public isAuthenticated(): boolean {
    const user = this.getUser();
    return !!user?.token?.access_token;
  }

  public getToken(): string | null {
    const user = this.getUser();
    return user?.token?.access_token || null;
  }

  public open(): void {
    netlifyIdentity.open();
  }

  public logout(): void {
    this.isLoggedIn = false;
    netlifyIdentity.logout();
    this.router.navigate(['/login']);
  }

  private login(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/recipes']).then(() => netlifyIdentity.close());
  }

  private getUser(): User | null {
    return JSON.parse(localStorage.getItem('gotrue.user')!) as User;
  }
}
