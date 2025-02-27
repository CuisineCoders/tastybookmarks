import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public canActivate(): boolean | UrlTree  {
    return this.authService.isAuthenticated() ? true : this.router.createUrlTree(['/login']);
  }
}
