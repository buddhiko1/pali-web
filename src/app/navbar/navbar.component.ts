import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarService } from './navbar.service';
import { OverlayService } from '../overlay/overlay.service';
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
    private router: Router,
    private navbarService: NavbarService,
    private overlayService: OverlayService,
    private publicService: PublicService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._url = event.url.slice(1) == '' ? RedirectTo : event.url.slice(1);
      }
    });
  }

  get isDark(): boolean {
    return this.navbarService.isDark;
  }

  get isMenuOpen(): boolean {
    return this.navbarService.isMenuOpen;
  }

  get isShow(): boolean {
    return this.navbarService.isShow;
  }

  isActiveUrl(url: string): boolean {
    return url === this._url;
  }

  toggleDark(): void {
    this.navbarService.isDark = !this.navbarService.isDark;
    if (!this.publicService.isLgDevice) {
      // close men after toggle theme
      // this.toggleMenu();
      if (!this.publicService.atPageTop) {
        this.navbarService.isShow = false;
      }
    }
  }

  closeMenu(): void {
    if (!this.publicService.isLgDevice) {
      this.navbarService.isMenuOpen = false;
      this.overlayService.isActive = false;
    }
  }

  toggleMenu(): void {
    if (!this.publicService.isLgDevice) {
      // active overlay when open menu
      this.navbarService.isMenuOpen = !this.navbarService.isMenuOpen;
      this.overlayService.isActive = this.navbarService.isMenuOpen
        ? true
        : false;
    }
  }
}
