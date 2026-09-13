import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, CookieService]
    });

    service = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);

    cookieService.delete('rpg-session');
  });

  afterEach(() => {
    cookieService.delete('rpg-session');
  });

  it('should start unauthenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should become authenticated after signin', () => {
    service.signin('Aragorn');

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should become unauthenticated after signout', () => {
    service.signin('Aragorn');

    expect(service.isAuthenticated()).toBeTrue();

    service.signout();

    expect(service.isAuthenticated()).toBeFalse();
  });
});