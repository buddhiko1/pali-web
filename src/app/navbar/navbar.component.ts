import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DeviceDetectorService } from 'ngx-device-detector';

import { FadeInDirective } from '../core/fade-in.directive';
import { ScrollbarService } from '../core/scrollbar.service';
import { HomeService } from '../home/home.service';
import { AppService } from '../app.service';
import { Modules } from 'src/gql/graphql';

import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    RouterLink,
    AngularSvgIconModule,
    FadeInDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  modules: Modules[] = [];
  menuToggled = false;
  private _activeUrl = '';

  constructor(
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    private _homeService: HomeService,
    private _scrollbarService: ScrollbarService,
    private _navbarService: NavbarService,
    private _appService: AppService,
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activeUrl = event.url.split('/')[1];
      }
    });
    this._homeService.fetchModules().then((modules) => {
      this.modules = modules;
    });
  }

  get isDark(): boolean {
    return this._navbarService.isDark;
  }

  get isShadowShow(): boolean {
    return this._navbarService.isShadowShow;
  }

  get isMenuOpen(): boolean {
    return this._navbarService.isMenuOpen;
  }

  get isShow(): boolean {
    return this._navbarService.isShow;
  }

  get isMaskBg(): boolean {
    return this._appService.isMaskBg;
  }

  toggleMenu(): void {
    this.menuToggled = true;
    this._navbarService.toggleMenu();
  }

  toggleDark(): void {
    this._scrollbarService.hideScrollbar();
    this._navbarService.activeDark(!this.isDark);
    this._scrollbarService.showScrollbar();
  }

  routeTo(url: string): void {
    if (this._activeUrl !== url) {
      if (!this._deviceService.isDesktop() && url) {
        this.toggleMenu();
      }
      this._router.navigateByUrl(url);
    }
  }

  isActiveUrl(url: string): boolean {
    return url === this._activeUrl;
  }
}
