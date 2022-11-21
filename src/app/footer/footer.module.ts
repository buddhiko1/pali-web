import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule, AngularSvgIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterModule { }
