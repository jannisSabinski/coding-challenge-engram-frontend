import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinner } from '../../core/loading-spinner/loading-spinner';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingSpinner],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    });
  }

  loginForm: FormGroup;
  loading = signal(false);



  onLogin() {
    this.loginForm.setErrors(null);
    this.loading.set(true);
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username!, password!).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/my-images';
        this.loading.set(false);
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loading.set(false);
        this.loginForm.setErrors({ invalid: true });
      },
    });
  }

  onSignup() {
    this.loginForm.setErrors(null);
    this.loading.set(true);
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.signup(username!, password!).subscribe({
      next: () => {
        this.loading.set(false);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/my-images';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loading.set(false);
        this.loginForm.setErrors({ signUpError: true });
      },
    });
  }
}
