import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LoadSlideDirective } from 'src/app/core/load-slide.directive';
import { ScrollSlideDirective } from 'src/app/core/scroll-slide.directive';
import { BookComponent } from 'src/app/book/book.component';

import { DictionaryComponent } from './dictionary.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';

@NgModule({
  declarations: [DictionaryComponent],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    LoadSlideDirective,
    ScrollSlideDirective,
  ],
  exports: [DictionaryComponent],
})
export class DictionaryModule {}
