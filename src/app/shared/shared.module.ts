import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPageLoaderComponent } from './components/loaders/full-page-loader/full-page-loader.component';
import { ProgressBarLoaderComponent } from './components/loaders/progress-bar-loader/progress-bar-loader.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonWithLoaderComponent } from './components/button-with-loader/button-with-loader.component';
import { LottieModule } from 'ngx-lottie';
import { lottiePlayerFactory } from '../app.module';
import { NotificationToggleComponent } from './components/notification-toggle/notification-toggle.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactAreaComponent } from './components/contact-area/contact-area.component';
import { ShimmersComponent } from './components/shimmers/shimmers.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    FullPageLoaderComponent,
    ProgressBarLoaderComponent,
    ButtonWithLoaderComponent,
    NotificationToggleComponent,
    ConfirmDialogComponent,
    ContactAreaComponent,
    ShimmersComponent,
    ModalComponent,
  ],
  exports: [
    ButtonWithLoaderComponent,
    FullPageLoaderComponent,
    NotificationToggleComponent,
    ConfirmDialogComponent,
    ContactAreaComponent,
    ShimmersComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ProgressbarModule,
    FormsModule,
    RouterModule,
    LottieModule.forRoot({ player: lottiePlayerFactory }),
  ],
})
export class SharedModule {}
