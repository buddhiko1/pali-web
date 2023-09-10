import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SliderDirective } from 'src/app/core/slider.directive';
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
    SliderDirective,
  ],
  exports: [DictionaryComponent],
})
export class DictionaryModule {}
