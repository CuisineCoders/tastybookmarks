import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false; // Login-Status simulieren

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/recipes']);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
