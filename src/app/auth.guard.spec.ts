import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should allow authenticated users', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(result).toBeTrue();
  });

  it('should redirect unauthenticated users to signin', () => {
    authService.isAuthenticated.and.returnValue(false);
    router.createUrlTree.and.returnValue({} as any);

    TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/signin'], {
      queryParams: {
        returnUrl: '/builder'
      }
    });
  });
});