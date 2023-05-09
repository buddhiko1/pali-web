import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { BookComponent } from 'src/app/book/book.component';
import { SlideOnLoadingDirective } from 'src/app/core/slide-on-loading.directive';

import { TipitakaComponent } from './tipitaka.component';
import { TipitakaRoutingModule } from './tipitaka-routing.module';

@NgModule({
  declarations: [TipitakaComponent],
  imports: [
    CommonModule,
    TipitakaRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    SlideOnLoadingDirective,
  ],
  exports: [TipitakaComponent],
})
export class TipitakaModule {}
