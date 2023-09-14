import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ScrollbarService } from 'src/app/core/scrollbar.service';
import { Modules } from 'src/gql/graphql';

import { HomeService } from '../home/home.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  modules: Modules[] = [];
  private _activeUrl = '';

  constructor(
    private _router: Router,
    private _navbarService: NavbarService,
    private _homeService: HomeService,
    private _scrollbarService: ScrollbarService
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activeUrl = event.url.slice(1);
      }
    });
    this.fetchModules();
  }

  fetchModules(): void {
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

  toggleDark(): void {
    this._scrollbarService.hideScrollbar();
    this._navbarService.activeDark(!this.isDark);
    this._scrollbarService.showScrollbar();
    if (this._navbarService.isMenuOpen) {
      this.closeMenu();
    }
  }

  routeTo(url: string): void {
    this.closeMenu();
    this._router.navigateByUrl(url);
  }

  get isMenuOpen(): boolean {
    return this._navbarService.isMenuOpen;
  }

  closeMenu(): void {
    this._navbarService.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen
      ? this._navbarService.closeMenu()
      : this._navbarService.openMenu();
  }

  get isHeaderShow(): boolean {
    return this._navbarService.isHeaderShow;
  }

  isActiveUrl(url: string): boolean {
    return url === this._activeUrl;
  }
}
