import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  currentStep: number = 1;
  loading: boolean = false;
  signupMessage = '';
  signupMessageType = '';
  signupAlertTimeout: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.initForms();
  }
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  initForms(): void {
    // Step 1 Form
    this.step1Form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        companyName: ['', Validators.required],
        role: ['', Validators.required],
        propertiesManaged: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );

    // Step 2 Form
    this.step2Form = this.fb.group({
      propertyName: ['', Validators.required],
      addressOfProperty: ['', Validators.required],
      propertyType: ['', Validators.required],
    });
  }

  onProceed(): void {
    console.log('Current Step:', this.currentStep);
    if (this.currentStep === 1 && this.step1Form.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.step2Form.valid) {
      // this.onSubmit();
    } else {
      console.log('Validation Failed for step:', this.currentStep);
      // this.logInvalidControls();
    }
    this.cdr.detectChanges();
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
