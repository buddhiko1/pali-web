import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DeviceDetectorService } from 'ngx-device-detector';

import { BackButtonDirective } from 'src/app/core/back-button.directive';
import { NavbarService } from 'src/app/navbar/navbar.service';
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
    private _deviceService: DeviceDetectorService,
    private _navbarService: NavbarService
  ) {
    if (this._deviceService.isDesktop()) {
      this._navbarService.showShadow(false);
    }
  }

  ngOnDestroy(): void {
    if (this._deviceService.isDesktop()) {
      this._navbarService.showShadow(true);
    }
  }
}
