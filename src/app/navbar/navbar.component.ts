import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { FadeInDirective } from '../core/fade-in.directive';
import { OverlayComponent } from '../overlay/overlay.component';
import { ScrollbarService } from '../core/scrollbar.service';
import { HomeService } from '../home/home.service';
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
    OverlayComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showOverlay = false;
  private _activeUrl = '';
  modules: Modules[] = [];

  constructor(
    private _router: Router,
    private _homeService: HomeService,
    private _scrollbarService: ScrollbarService,
    private _navbarService: NavbarService,
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

  get isMenuOpened(): boolean {
    return this._navbarService.isMenuOpen;
  }

  get isShow(): boolean {
    return this._navbarService.isShow;
  }

  toggleMenu(): void {
    this._navbarService.toggleMenu();
    this.showOverlay = !this.showOverlay;
  }

  toggleDark(): void {
    this._scrollbarService.hideScrollbar();
    this._navbarService.activeDark(!this.isDark);
    this._scrollbarService.showScrollbar();
  }

  routeTo(url: string): void {
    if (this._activeUrl !== url) {
      if (this.isMenuOpened) {
        this.toggleMenu();
      }
      this._router.navigateByUrl(url);
    }
  }

  isActiveUrl(url: string): boolean {
    return url === this._activeUrl;
  }
}
