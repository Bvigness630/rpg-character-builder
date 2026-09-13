import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly signinForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    accessCode: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{6}$/)
      ]
    })
  });

  get username() {
    return this.signinForm.controls.username;
  }

  get accessCode() {
    return this.signinForm.controls.accessCode;
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    this.authService.signin(this.username.value);

    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') ?? '/builder';

    this.router.navigateByUrl(returnUrl);
  }
}