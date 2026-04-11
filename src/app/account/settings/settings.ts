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

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, Popup],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  constructor(private authService: AuthService, private router: Router) {
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
  popUpMessage = "";

  changePassword() {
    this.changePasswordForm.setErrors(null);
    const password = this.changePasswordForm.get('newPassword')?.value;
    console.log('clicked');
    this.authService.changePassword(password).subscribe({
      next: () => {
        this.popUpMessage = 'Password changed successfully!';
        this.showPopup.set(true);
        this.changePasswordForm.reset();
      },
      error: () => {
        this.changePasswordForm.setErrors({ error: true });
      },
    });
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.popUpMessage = "Something went wrong";
        this.showPopup.set(true);;
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
