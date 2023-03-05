import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BookComponent } from '../book/book.component';
import { LoadSlideDirective } from '../core/load-slide.directive';
import { TipitakaComponent } from './tipitaka.component';
import { TipitakaRoutingModule } from './tipitaka-routing.module';

@NgModule({
  declarations: [TipitakaComponent],
  imports: [
    CommonModule,
    TipitakaRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    LoadSlideDirective,
  ],
  exports: [TipitakaComponent],
})
export class TipitakaModule {}
