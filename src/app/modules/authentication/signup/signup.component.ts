import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  otpSent: boolean = false;
  otpConfirmed: boolean = false;
  errorMessage: string = '';

  loading: boolean = false;
  signupMessage = '';
  signupMessageType = '';
  signupAlertTimeout: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      otp: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}
  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      return { invalidEmail: true };
    }

    return null;
  }

  sendCode(): void {
    // this.loading = true;
    if (this.signupForm.get('email')?.valid) {
      const { email } = this.signupForm.value;
      this.otpSent = true;

      this.apiService.signupEmail(email).subscribe(
        (response) => {
          console.log('response from api is: ', response);
          console.log('response from api is: ', response);
          if (response.message === 'Verification code sent to email') {
            this.showSignupAlert('Code sent successfully', 'success');
            console.log('Email success', response);
            this.authService.storeUserId(response.data.userId);
            this.otpSent = true;
          } else {
            console.error('Not a valid email.', response.message);
            this.showSignupAlert(
              'Failed to send code: ' + (response.message ?? 'incorrect email'),
              'danger'
            );
          }
          this.loading = false;
          this.loading = false;
        },
        (error) => {
          console.log('Error response from api: ', error.error);
          this.errorMessage =
            // error.error.error ||
            error.error || 'An error occurred while sending verification code.';
          this.showSignupAlert(this.errorMessage, 'danger');
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  confirmOtp(): void {
    // this.loading = true;
    this.otpConfirmed = true;

    if (this.signupForm.get('otp')?.valid) {
      const { otp } = this.signupForm.value;
      this.apiService.signupOtp(otp).subscribe(
        (response) => {
          console.log('response from api is: ', response);
          console.log('response from api is: ', response);
          if (response.message === 'Verification successful') {
            this.showSignupAlert('Otp sent successfully', 'success');
            console.log('Otp sent success', response);
            this.otpConfirmed = true;
          } else {
            console.error('Access denied. Incorrect.', response.message);
            this.showSignupAlert(
              'Failed to Continue: ' +
                (response.message ?? 'incorrect otp provided'),
              'danger'
            );
          }
          this.loading = false;
          this.loading = false;
        },
        (error) => {
          console.log('Error response from api: ', error.error);
          this.errorMessage =
            error.error.error ||
            error.error ||
            'An error occurred while verifying otp.';

          this.showSignupAlert(this.errorMessage, 'danger');
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
    this.loading = true;
    if (this.signupForm.valid) {
      const { firstName, lastName, password } = this.signupForm.value;
      this.apiService.signupFinal(firstName, lastName, password).subscribe(
        (response) => {
          console.log('response from api is: ', response);
          console.log('response from api is: ', response);
          if (response.message === 'User created successfully') {
            this.showSignupAlert('Signup successful', 'success');
            console.log('Login success', response);
            this.authService.storeJwtToken(response.token);
            this.authService.storeRefreshToken(response.refreshToken);
            this.authService.storeUserId(response.User.id);
            this.authService.storeUser(response.User);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Access denied. Cant signup.', response.message);
            this.showSignupAlert(
              'Failed to signup: ' +
                (response.message ?? 'check your internet'),
              'danger'
            );
          }
          this.loading = false;
          this.loading = false;
        },
        (error) => {
          console.log('Error response from api: ', error.error);
          this.errorMessage =
            error.error.error ||
            error.error ||
            'An error occurred during signup.';

          this.showSignupAlert(this.errorMessage, 'danger');
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  goBackToEmail() {
    this.otpSent = false;
    this.otpConfirmed = false;
    this.signupForm.get('email')?.enable();
  }

  get email(): AbstractControl {
    return this.signupForm.get('email')!;
  }

  get otp(): AbstractControl {
    return this.signupForm.get('otp')!;
  }

  get firstName(): AbstractControl {
    return this.signupForm.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.signupForm.get('lastName')!;
  }

  get password(): AbstractControl {
    return this.signupForm.get('password')!;
  }
  showSignupAlert(message: string, type: string) {
    // Clear any existing timeout to reset the timer
    if (this.signupAlertTimeout) {
      clearTimeout(this.signupAlertTimeout);
    }

    // Set the login message and type
    this.signupMessage = message;
    this.signupMessageType = type;

    // Set a timeout to clear the login message after 5 seconds (5000 ms)
    this.signupAlertTimeout = setTimeout(() => {
      this.signupMessage = '';
    }, 3000);
  }
}
