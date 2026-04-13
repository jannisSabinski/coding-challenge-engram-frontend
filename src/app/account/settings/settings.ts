import { Component, NgZone, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Popup } from '../../core/popup/popup';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingSpinner } from '../../core/loading-spinner/loading-spinner';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, Popup, LoadingSpinner],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.changePasswordForm = new FormGroup(
      {
        newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
        repeat: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  changePasswordForm: FormGroup;
  showPopup = signal(false);
  popUpMessage = '';

  deleteLoading = signal(false);
  changePwLoading = signal(false);

  changePassword() {
    this.changePasswordForm.setErrors(null);
    const password = this.changePasswordForm.get('newPassword')?.value;
    this.changePwLoading.set(true);
    this.authService.changePassword(password).subscribe({
      next: () => {
        this.changePwLoading.set(false);
        this.popUpMessage = 'Password changed successfully!';
        this.showPopup.set(true);
        this.changePasswordForm.reset();
      },
      error: () => {
        this.deleteLoading.set(false);
        this.changePasswordForm.setErrors({ error: true });
      },
    });
  }

  deleteAccount() {
    this.deleteLoading.set(true);
    this.authService.deleteAccount().subscribe({
      next: () => {
        this.deleteLoading.set(false);
        this.router.navigate(['/']);
      },
      error: () => {
        this.deleteLoading.set(false);
        this.popUpMessage = 'Something went wrong';
        this.showPopup.set(true);
      },
    });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const repeat = control.get('repeat');

    if (!newPassword || !repeat || newPassword.value === repeat.value) {
      return null;
    }
    return { mismatch: true };
  };
}
