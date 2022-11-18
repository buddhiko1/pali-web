import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, AngularSvgIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule { }
