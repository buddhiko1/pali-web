import { Component } from '@angular/core';

import { SlideInDirective } from '../shared/directives/slide-in.directive';
import { GithubSvgComponent } from '../svg/github/github.component';
import { DownloadSvgComponent } from '../svg/download/download.component';
import { IconButtonComponent } from '../ui/icon-button/icon-button.component';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { UrlService } from '../shared/services/url.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { BookComponent, DirectionEnum } from '../ui/book/book.component';
import { Config as BookConfig } from '../ui/book/book.model';
import { DictionariesService } from './dictionaries.service';
import { Dict_Introduction } from 'src/gql/graphql';
import { Dictionaries as Dictionary } from 'src/gql/graphql';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [
    GithubSvgComponent,
    DownloadSvgComponent,
    IconButtonComponent,
    SlideInDirective,
    SafeHtmlPipe,
    BookComponent,
  ],
  templateUrl: './dictionaries.component.html',
  styleUrl: './dictionaries.component.css',
})
export class DictionariesComponent {
  introduction!: Dict_Introduction;
  dictionaries: Dictionary[] = [];

  constructor(
    private _dictionaryService: DictionariesService,
    private _urlService: UrlService,
    private _utilitiesService: UtilitiesService,
  ) {
    this._dictionaryService.fetchIntroduction().then((introduction) => {
      this.introduction = introduction;
    });
    this._dictionaryService.fetchDictionaries().then((dictionaries) => {
      this.dictionaries = dictionaries;
    });
  }

  bookConfigFor(dictionary: Dictionary): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: this._urlService.fileUrlFor(dictionary.cover?.filename_disk),
      color: '#477999',
      direction:
        dictionary.index % 2 ? DirectionEnum.RightView : DirectionEnum.LeftView,
    };
  }

  openDictionaryUrl(dictionary: Dictionary) {
    this._utilitiesService.openNewTab(dictionary.info_url);
  }

  downloadDictionary(dictionary: Dictionary) {
    const downloadUrl = this._urlService.fileUrlFor(
      dictionary.zip?.filename_disk,
    );
    const downloadFilename = dictionary.name + '.zip';
    this._utilitiesService.downloadFile(downloadUrl, downloadFilename);
  }
}
