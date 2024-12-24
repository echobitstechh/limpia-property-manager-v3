import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './modules/authentication/login/login.component';
import { ForgotPasswordComponent } from './modules/authentication/forgot-password/forgot-password.component';
import { AuthGuard } from './services/authGuard.service';
import { SignupComponent } from './modules/authentication/signup/signup.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./modules/landing-page/landing-page.module').then(
  //       (m) => m.LandingPageModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
