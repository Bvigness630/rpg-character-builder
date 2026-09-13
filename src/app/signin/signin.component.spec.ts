import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
      'signin',
      'signout'
    ]);

    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => '/builder'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start with an invalid form', () => {
    expect(component.signinForm.invalid).toBeTrue();
  });

  it('should reject a username shorter than 3 characters', () => {
    component.signinForm.setValue({
      username: 'Bo',
      accessCode: 'ABC123'
    });

    expect(component.username.invalid).toBeTrue();
    expect(component.username.hasError('minlength')).toBeTrue();
  });

  it('should reject an access code that is not exactly 6 alphanumeric characters', () => {
    component.signinForm.setValue({
      username: 'Aragorn',
      accessCode: 'ABC12!'
    });

    expect(component.accessCode.invalid).toBeTrue();
    expect(component.accessCode.hasError('pattern')).toBeTrue();
  });

  it('should accept a valid form', () => {
    component.signinForm.setValue({
      username: 'Aragorn',
      accessCode: 'ABC123'
    });

    expect(component.signinForm.valid).toBeTrue();
  });

  it('should not sign in when the form is invalid', () => {
    component.onSubmit();

    expect(authService.signin).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should sign in and navigate to the return URL when the form is valid', () => {
    component.signinForm.setValue({
      username: 'Aragorn',
      accessCode: 'ABC123'
    });

    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('Aragorn');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/builder');
  });
});