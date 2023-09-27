import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { Config as BookConfig } from '../book/book.model';
import { NavbarService } from '../navbar/navbar.service';
import { BookComponent, DirectionEnum } from '../book/book.component';
import { SliderDirective } from '../core/slider.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { environment } from 'src/environments/environment';
import { Tipitaka, Cites } from 'src/gql/graphql';
import { TipitakaService } from './tipitaka.service';

@Component({
  selector: 'app-tipitaka',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    BookComponent,
    SliderDirective,
    FadeInDirective,
  ],
  templateUrl: './tipitaka.component.html',
  styleUrls: ['./tipitaka.component.css'],
})
export class TipitakaComponent implements OnDestroy {
  fileServer = environment.fileServer;
  tipitaka: Tipitaka[] = [];
  cites: Cites[] = [];

  constructor(
    private _navbarService: NavbarService,
    private _tipitakaService: TipitakaService,
  ) {
    this._tipitakaService.fetchTipitaka().then((tipitaka) => {
      this.tipitaka = tipitaka;
    });
    this._tipitakaService.fetchCites().then((cites) => {
      this.cites = cites;
    });
    this._navbarService.showShadow(false);
  }

  bookConfigFor(tipitaka: Tipitaka): BookConfig {
    return {
      height: '16rem',
      width: '12rem',
      image: tipitaka.cover?.id
        ? `${environment.fileServer}/${tipitaka.cover?.id}`
        : '',
      color: '#477999',
      direction: DirectionEnum.FrontView,
    };
  }

  ngOnDestroy(): void {
    this._navbarService.showShadow(true);
  }
}
