import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SliderDirective } from '../core/slider.directive';
import { SafeHtmlPipe } from '../core/safe-html.pipe';
import { BookComponent, DirectionEnum } from '../book/book.component';
import { Config as BookConfig } from '../book/book.model';
import { environment } from 'src/environments/environment';
import { DictionaryService } from './dictionary.service';
import { Dictionaries, Dict_Introduction } from 'src/gql/graphql';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    SliderDirective,
    SafeHtmlPipe,
    BookComponent,
  ],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent {
  fileServer = environment.fileServer;
  introduction: Dict_Introduction = {} as Dict_Introduction;
  dictionaries: Dictionaries[] = [];

  constructor(private _dictionaryService: DictionaryService) {
    this._dictionaryService.fetchIntroduction().then((introduction) => {
      this.introduction = introduction;
    });
    this._dictionaryService.fetchDictionaries().then((dictionaries) => {
      this.dictionaries = dictionaries;
    });
  }

  bookConfigFor(dictionary: Dictionaries): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: dictionary.cover?.id
        ? `${environment.fileServer}/${dictionary.cover?.id}`
        : '',
      color: '#477999',
      direction:
        dictionary.index % 2 ? DirectionEnum.RightView : DirectionEnum.LeftView,
    };
  }
}
