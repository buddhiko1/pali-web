import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { BackButtonDirective } from 'src/app/core/back-button.directive';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { PublicService } from 'src/app/core/public.service';
import { SnowBgComponent } from 'src/app/snow-bg/snow-bg.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    BackButtonDirective,
    SnowBgComponent,
  ],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnDestroy {
  constructor(
    private _publicService: PublicService,
    private _navbarService: NavbarService
  ) {
    if (this._publicService.isLgDevice) {
      this._navbarService.showShadow(false);
    }
  }

  ngOnDestroy(): void {
    if (this._publicService.isLgDevice) {
      this._navbarService.showShadow(true);
    }
  }
}
