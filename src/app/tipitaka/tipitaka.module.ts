import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BookComponent } from '../book/book.component';
import { SlideElementDirective } from '../slide.directive';
import { TipitakaComponent } from './tipitaka.component';
import { TipitakaRoutingModule } from './tipitaka-routing.module';

@NgModule({
  declarations: [TipitakaComponent],
  imports: [
    CommonModule,
    TipitakaRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    SlideElementDirective,
  ],
  exports: [TipitakaComponent],
})
export class TipitakaModule {}
