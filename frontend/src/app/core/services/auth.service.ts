import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly oidcSecurityService = inject(OidcSecurityService);

  private isLoggedIn = false;

  constructor() {
    this.oidcSecurityService.checkAuth().subscribe((token) => console.log(token));
  }

  public isAuthenticated(): boolean {
    return false;
  }

  public getToken(): string | null {
    return null
  }

  public open(): void {
  }

  public logout(): void {
    this.oidcSecurityService
      .logoff()
      .pipe(
        tap((result) => console.log(result)),
        switchMap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }

  private login(): void {
    this.oidcSecurityService.authorize();
  }
}
