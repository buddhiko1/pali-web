import { Component } from '@angular/core';

import { SlideInDirective } from '../shared/directives/slide-in.directive';
import { GithubSvgComponent } from '../svg/github/github.component';
import { DownloadSvgComponent } from '../svg/download/download.component';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { UrlService } from '../shared/services/url.service';
import { BookComponent, DirectionEnum } from '../book/book.component';
import { Config as BookConfig } from '../book/book.model';
import { DictionariesService } from './dictionaries.service';
import { Dictionaries, Dict_Introduction } from 'src/gql/graphql';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [
    GithubSvgComponent,
    DownloadSvgComponent,
    SlideInDirective,
    SafeHtmlPipe,
    BookComponent,
  ],
  templateUrl: './dictionaries.component.html',
  styleUrl: './dictionaries.component.css',
})
export class DictionariesComponent {
  introduction!: Dict_Introduction;
  dictionaries: Dictionaries[] = [];

  constructor(
    private _dictionaryService: DictionariesService,
    private _urlService: UrlService,
  ) {
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
      image: this._urlService.fileUrlFor(dictionary.cover?.filename_disk),
      color: '#477999',
      direction:
        dictionary.index % 2 ? DirectionEnum.RightView : DirectionEnum.LeftView,
    };
  }

  downloadUrlFor(dictionary: Dictionaries): string {
    return this._urlService.downloadUrlFor(dictionary.zip?.filename_disk);
  }
}
