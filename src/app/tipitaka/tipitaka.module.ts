import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { BookComponent } from 'src/app/book/book.component';
import { SliderDirective } from 'src/app/core/slider.directive';
import { FadeInDirective } from '../core/fade-in.directive';

import { TipitakaComponent } from './tipitaka.component';
import { TipitakaRoutingModule } from './tipitaka-routing.module';

@NgModule({
  declarations: [TipitakaComponent],
  imports: [
    CommonModule,
    TipitakaRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    SliderDirective,
    FadeInDirective,
  ],
  exports: [TipitakaComponent],
})
export class TipitakaModule {}
