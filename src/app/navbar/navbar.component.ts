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
    this.isDark
      ? this._navbarService.activeDark(false)
      : this._navbarService.activeDark(true);
    this._scrollbarService.showScrollbar();
    if (this._navbarService.isMenuOpen) {
      this.closeMenu();
    }
  }

  routeToAccount(): void {
    this._router.navigateByUrl(UrlEnum.Account);
    this.closeMenu();
  }

  routeToDonation(): void {
    // this._router.navigateByUrl(UrlEnum.Donation);
    this.closeMenu();
  }

  get isMenuOpen(): boolean {
    return this._navbarService.isMenuOpen;
  }

  closeMenu(): void {
    this._navbarService.closeMenu();
  }

  toggleMenu(): void {
    if (this.isMenuOpen) {
      this._navbarService.closeMenu();
    } else {
      this._navbarService.openMenu();
    }
  }

  get isHeaderShow(): boolean {
    return this._navbarService.isHeaderShow;
  }

  isActiveUrl(url: string): boolean {
    return url === this._url;
  }
}
