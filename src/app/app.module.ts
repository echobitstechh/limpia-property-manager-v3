import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuccessDialogComponent } from './shared/components/success-dialog/success-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { ToggleSidebarDirective } from './toggle-sidebar.directive';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpInterceptorProviders } from './auth.interceptor';
import { LayoutModule } from './modules/layout/layout.module';

export function lottiePlayerFactory(): any {
  return import('lottie-web/build/player/lottie_svg');
}

@Injectable({
  providedIn: 'root',
})
@NgModule({
  declarations: [AppComponent, SuccessDialogComponent, ToggleSidebarDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    SharedModule,
    HttpClientModule,
    ModalModule.forRoot(),
    LottieModule.forRoot({ player: lottiePlayerFactory }),
    ReactiveFormsModule,
    LayoutModule,
  ],
  providers: [httpInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
