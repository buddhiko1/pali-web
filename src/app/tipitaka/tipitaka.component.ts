import { Component } from '@angular/core';

import { Config as BookConfig } from '../ui/book/book.model';
import { BookComponent, DirectionEnum } from '../ui/book/book.component';
import { SlideInDirective } from '../shared/directives/slide-in.directive';
import { FadeInDirective } from '../shared/directives/fade-in.directive';
import { UrlService } from '../shared/services/url.service';
import { GithubSvgComponent } from '../svg/github/github.component';
import { DownloadSvgComponent } from '../svg/download/download.component';
import { QuoteSvgComponent } from '../svg/quote/quote.component';
import { TipitakaService } from './tipitaka.service';
import { Tipitaka, Cites } from 'src/gql/graphql';

@Component({
  selector: 'app-tipitaka',
  standalone: true,
  imports: [
    BookComponent,
    GithubSvgComponent,
    DownloadSvgComponent,
    QuoteSvgComponent,
    SlideInDirective,
    FadeInDirective,
  ],
  templateUrl: './tipitaka.component.html',
  styleUrl: './tipitaka.component.css',
})
export class TipitakaComponent {
  tipitaka: Tipitaka[] = [];
  cites: Cites[] = [];

  constructor(
    private _tipitakaService: TipitakaService,
    private _urlService: UrlService,
  ) {
    this._tipitakaService.fetchTipitaka().then((tipitaka) => {
      this.tipitaka = tipitaka;
    });
    this._tipitakaService.fetchCites().then((cites) => {
      this.cites = cites;
    });
  }

  bookConfigFor(book: Tipitaka): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: this._urlService.fileUrlFor(book.cover?.filename_disk),
      color: '#477999',
      direction: DirectionEnum.FrontView,
    };
  }

  downloadUrlFor(book: Tipitaka): string {
    return this._urlService.downloadUrlFor(book.zip?.filename_disk);
  }
}
