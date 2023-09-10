import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SliderDirective } from 'src/app/core/slider.directive';
import { TypingDirective } from 'src/app/core/typing.directive';
import { PhraseComponent } from 'src/app/phrase/phrase.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    SliderDirective,
    TypingDirective,
    HomeRoutingModule,
    PhraseComponent,
  ],
})
export class HomeModule {}
