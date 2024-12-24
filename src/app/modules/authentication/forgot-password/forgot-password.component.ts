import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm!: FormGroup;
  otpSent: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  forgotPasswordMessage = '';
  forgotPasswordMessageType = '';
  forgotPasswordAlertTimeout: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        otp: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnDestroy(): void {
    if (this.forgotPasswordAlertTimeout) {
      clearTimeout(this.forgotPasswordAlertTimeout);
    }
  }

  passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSendMail() {
    this.loading = true;
    if (this.forgotPasswordForm.get('email')?.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.apiService.resetPassword(email).subscribe(
        (response) => {
          if (response.message === 'Password reset token sent to email') {
            this.showForgotPasswordAlert('Code sent successfully', 'success');
            this.otpSent = true;
          } else {
            this.showForgotPasswordAlert(
              'Failed to send code: ' + (response.message ?? 'incorrect email'),
              'danger'
            );
          }
          this.loading = false;
        },
        (error) => {
          this.errorMessage =
            error.error.error ||
            error.error ||
            'An error occurred while sending verification code.';
          this.showForgotPasswordAlert(this.errorMessage, 'danger');
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  onConfirm() {
    this.loading = true;
    if (this.forgotPasswordForm.valid) {
      const { otp, password, confirmPassword } = this.forgotPasswordForm.value;
      this.apiService.updatePassword(otp, password, confirmPassword).subscribe(
        (response) => {
          if (response.message === 'Password reset successfully') {
            this.showForgotPasswordAlert(
              'Password reset successful',
              'success'
            );
            this.router.navigate(['/login']);
          } else {
            this.showForgotPasswordAlert(
              'Failed to reset password: ' +
                (response.message ?? 'check your internet'),
              'danger'
            );
          }
          this.loading = false;
        },
        (error) => {
          this.errorMessage =
            error.error.error ||
            error.error ||
            'An error occurred during password reset.';
          this.showForgotPasswordAlert(this.errorMessage, 'danger');
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  showForgotPasswordAlert(message: string, type: string) {
    if (this.forgotPasswordAlertTimeout) {
      clearTimeout(this.forgotPasswordAlertTimeout);
    }
    this.forgotPasswordMessage = message;
    this.forgotPasswordMessageType = type;
    this.forgotPasswordAlertTimeout = setTimeout(() => {
      this.forgotPasswordMessage = '';
    }, 3000);
  }
}
