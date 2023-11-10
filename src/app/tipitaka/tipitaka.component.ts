import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { Config as BookConfig } from '../book/book.model';
import { BookComponent, DirectionEnum } from '../book/book.component';
import { SliderDirective } from '../core/slider.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { GithubSvgComponent } from '../svg/github/github.component';
import { DownloadSvgComponent } from '../svg/download/download.component';
import { QuoteSvgComponent } from '../svg/quote/quote.component';
import { TipitakaService } from './tipitaka.service';
import { Tipitaka, Cites } from 'src/gql/graphql';

@Component({
  selector: 'app-tipitaka',
  standalone: true,
  imports: [
    CommonModule,
    BookComponent,
    GithubSvgComponent,
    DownloadSvgComponent,
    QuoteSvgComponent,
    SliderDirective,
    FadeInDirective,
  ],
  templateUrl: './tipitaka.component.html',
  styleUrl: './tipitaka.component.css',
})
export class TipitakaComponent {
  fileServer = environment.fileServer;
  tipitaka: Tipitaka[] = [];
  cites: Cites[] = [];

  constructor(private _tipitakaService: TipitakaService) {
    this._tipitakaService.fetchTipitaka().then((tipitaka) => {
      this.tipitaka = tipitaka;
    });
    this._tipitakaService.fetchCites().then((cites) => {
      this.cites = cites;
    });
  }

  bookConfigFor(tipitaka: Tipitaka): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: tipitaka.cover?.id
        ? `${environment.fileServer}/${tipitaka.cover?.filename_disk}`
        : '',
      color: '#477999',
      direction: DirectionEnum.FrontView,
    };
  }
}
