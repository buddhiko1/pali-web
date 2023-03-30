import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HomeComponent } from './home.component';
import { LoadSlideDirective } from '../core/load-slide.directive';
import { TypingDirective } from '../core/typing.directive';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    LoadSlideDirective,
    TypingDirective,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
