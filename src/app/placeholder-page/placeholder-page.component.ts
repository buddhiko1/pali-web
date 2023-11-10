import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { SliderDirective } from '../core/slider.directive';
import { FadeInDirective } from '../core/fade-in.directive';
import { BackButtonDirective } from '../core/back-button.directive';
import { LarrowSvgComponent } from '../svg/larrow/larrow.component';
import { SnowBgComponent } from '../snow-bg/snow-bg.component';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [
    CommonModule,
    LarrowSvgComponent,
    BackButtonDirective,
    SnowBgComponent,
    SliderDirective,
    FadeInDirective,
  ],
  templateUrl: './placeholder-page.component.html',
  styleUrl: './placeholder-page.component.css',
})
export class PlaceholderPageComponent implements OnDestroy {
  text = '';

  constructor(
    private _deviceService: DeviceDetectorService,
    private _navbarService: NavbarService,
    private _activeRoute: ActivatedRoute,
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
