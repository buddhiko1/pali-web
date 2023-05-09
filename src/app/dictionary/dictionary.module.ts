import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SlideOnLoadingDirective } from 'src/app/core/slide-on-loading.directive';
import { SlideOnScrollDirective } from 'src/app/core/slide-on-scroll.directive';
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
    SlideOnLoadingDirective,
    SlideOnScrollDirective,
  ],
  exports: [DictionaryComponent],
})
export class DictionaryModule {}
