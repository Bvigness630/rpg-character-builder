import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly sessionCookie = 'rpg-session';

  constructor(private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    return this.cookieService.check(this.sessionCookie);
  }

  signin(username: string): void {
    this.cookieService.set(this.sessionCookie, username);
  }

  signout(): void {
    this.cookieService.delete(this.sessionCookie);
  }
}