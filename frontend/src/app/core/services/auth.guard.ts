import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public async canActivate(): Promise<boolean | UrlTree>  {
    return (await this.authService.isAuthenticated()) || this.router.createUrlTree(['/login']);
  }
}
