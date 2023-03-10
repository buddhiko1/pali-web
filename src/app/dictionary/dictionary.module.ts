import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoadSlideDirective } from '../core/load-slide.directive';
import { ScrollSlideDirective } from '../core/scroll-slide.directive';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { BookComponent } from '../book/book.component';

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
