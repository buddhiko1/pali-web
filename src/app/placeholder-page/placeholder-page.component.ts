import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DeviceDetectorService } from 'ngx-device-detector';

import { SliderDirective } from 'src/app/core/slider.directive';
import { BackButtonDirective } from 'src/app/core/back-button.directive';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { SnowBgComponent } from 'src/app/snow-bg/snow-bg.component';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    BackButtonDirective,
    SnowBgComponent,
    SliderDirective,
  ],
  templateUrl: './placeholder-page.component.html',
  styleUrls: ['./placeholder-page.component.css'],
})
export class PlaceholderPageComponent implements OnDestroy {
  text = '';

  constructor(
    private _deviceService: DeviceDetectorService,
    private _navbarService: NavbarService,
    private _activeRoute: ActivatedRoute
  ) {
    if (this._deviceService.isDesktop()) {
      this._navbarService.showShadow(false);
    }
    this._activeRoute.params.subscribe((params: Params) => {
      this.text = params['text'];
    });
    this._activeRoute.data.subscribe((data) => {
      this.text = data['text'];
    });
  }

  ngOnDestroy(): void {
    if (this._deviceService.isDesktop()) {
      this._navbarService.showShadow(true);
    }
  }
}
