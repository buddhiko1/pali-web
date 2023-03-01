import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { BookComponent } from '../book/book.component';
import { SlideElementDirective } from '../slide.directive';

@NgModule({
  declarations: [DictionaryComponent],
  exports: [DictionaryComponent],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    SlideElementDirective,
  ],
})
export class DictionaryModule {}
