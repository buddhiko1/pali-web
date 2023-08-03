import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SlideOnLoadingDirective } from 'src/app/core/slide-on-loading.directive';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule, AngularSvgIconModule, SlideOnLoadingDirective],
})
export class FooterModule {}
