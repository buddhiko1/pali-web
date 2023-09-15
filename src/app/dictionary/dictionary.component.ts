import { Component } from '@angular/core';

import { Dictionaries, Dict_Introduction } from 'src/gql/graphql';
import { Config as BookConfig } from '../book/book.model';
import { DictionaryService } from './dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent {
  introduction: Dict_Introduction = {} as Dict_Introduction;
  dictionaries: Dictionaries[] = [];

  constructor(private _dictionaryService: DictionaryService) {
    this._fetchContent();
  }

  private _fetchContent(): void {
    this._dictionaryService.fetchIntroduction().then((introduction) => {
      this.introduction = introduction;
    });
    this._dictionaryService.fetchDictionaries().then((dictionaries) => {
      this.dictionaries = dictionaries;
      console.log(dictionaries);
    });
  }

  bookConfigFor(dictionary: Dictionaries): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: dictionary.cover?.location ?? '',
      color: '#477999',
      direction: dictionary.index % 2 ? 'right-view' : 'left-view',
    };
  }
}
