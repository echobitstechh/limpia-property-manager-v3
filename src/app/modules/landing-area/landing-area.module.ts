import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingAreaRoutingModule } from './landing-area-routing.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, LandingAreaRoutingModule],
})
export class LandingAreaModule {}
