import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { SlideInDirective } from '../core/slide-in.directive';
import { GithubSvgComponent } from '../svg/github/github.component';
import { DownloadSvgComponent } from '../svg/download/download.component';
import { SafeHtmlPipe } from '../core/safe-html.pipe';
import { BookComponent, DirectionEnum } from '../book/book.component';
import { Config as BookConfig } from '../book/book.model';
import { DictionaryService } from './dictionary.service';
import { Dictionaries, Dict_Introduction } from 'src/gql/graphql';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [
    CommonModule,
    GithubSvgComponent,
    DownloadSvgComponent,
    SlideInDirective,
    SafeHtmlPipe,
    BookComponent,
  ],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css',
})
export class DictionaryComponent {
  fileServer = environment.fileServer;
  introduction!: Dict_Introduction;
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
        ? `${environment.fileServer}/${dictionary.cover?.id}.webp`
        : '',
      color: '#477999',
      direction:
        dictionary.index % 2 ? DirectionEnum.RightView : DirectionEnum.LeftView,
    };
  }
}
