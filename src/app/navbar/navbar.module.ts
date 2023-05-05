import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, TitleCasePipe, AngularSvgIconModule, RouterLink],
})
export class NavbarModule {}
