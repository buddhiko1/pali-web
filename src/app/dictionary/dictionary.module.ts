import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { BookComponent } from '../book/book.component';

@NgModule({
  declarations: [DictionaryComponent],
  exports: [DictionaryComponent],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    AngularSvgIconModule,
    BookComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DictionaryModule {}