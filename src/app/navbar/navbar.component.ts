import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ScrollbarService } from 'src/app/core/scrollbar.service';
import { UrlEnum, RedirectTo } from 'src/app/app-routing.module';

import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  UrlEnum = UrlEnum;
  textUrlList = [
    UrlEnum.Grammar,
    UrlEnum.Dictionary,
    UrlEnum.Vocabulary,
    UrlEnum.Tipitaka,
    UrlEnum.Reading,
    UrlEnum.Blog,
  ];
  private _url: string = this.UrlEnum.Home;

  constructor(
    private _router: Router,
    private _navbarService: NavbarService,
    private _scrollbarService: ScrollbarService
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._url = event.url.slice(1) == '' ? RedirectTo : event.url.slice(1);
      }
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

  routeTo(page: UrlEnum): void {
    this.closeMenu();
    this._router.navigateByUrl(page);
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
    return url === this._url;
  }
}
