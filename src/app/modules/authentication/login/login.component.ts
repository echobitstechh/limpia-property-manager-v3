import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  loading: boolean = false;
  loginMessage = '';
  loginMessageType = '';
  loginAlertTimeout: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.login(email, password).subscribe(
        (response) => {
          console.log('response from api is: ', response);
          console.log('response from api is: ', response);
          if (response.status === 200) {
            this.showLoginAlert('Login successful', 'success');
            console.log('Login success', response);
            this.authService.storeJwtToken(response.token);
            this.authService.storeRefreshToken(response.refreshToken);
            this.authService.storeUserId(response.User.id);
            this.authService.storeUser(response.User);
            this.router.navigate(['/dashboard']);
            this.loading = false;
          } else {
            this.showLoginAlert(
              'Failed to login: ' +
                (response.message ?? 'incorrect username or password'),
              'danger'
            );
          }
          this.loading = false;
        },
        (error) => {
          console.log('Error response from api: ', error.error);
          this.errorMessage =
            error.error.error ||
            error.error ||
            'An error occurred during login.';

          // this.errorMessage = error.error.message || error.error.error || 'An error occurred during login.';

          this.showLoginAlert(this.errorMessage, 'danger');
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }
  showLoginAlert(message: string, type: string) {
    // Clear any existing timeout to reset the timer
    if (this.loginAlertTimeout) {
      clearTimeout(this.loginAlertTimeout);
    }

    // Set the login message and type
    this.loginMessage = message;
    this.loginMessageType = type;

    // Set a timeout to clear the login message after 5 seconds (5000 ms)
    this.loginAlertTimeout = setTimeout(() => {
      this.loginMessage = '';
    }, 5000);
  }
  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }
}
