import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarService } from './navbar.service';
import { PublicService } from '../core/public.service';
import { UrlEnum, RedirectTo } from '../app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  UrlEnum: typeof UrlEnum = UrlEnum;
  private _url: string = this.UrlEnum.Home;

  constructor(
    private _router: Router,
    private _navbarService: NavbarService,
    private _publicService: PublicService
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._url = event.url.slice(1) == '' ? RedirectTo : event.url.slice(1);
      }
    });
  }

  get isDark(): boolean {
    return this._publicService.isDark;
  }

  toggleDark(): void {
    this._publicService.toggleDark();
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
