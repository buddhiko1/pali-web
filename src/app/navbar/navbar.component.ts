import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarService } from './navbar.service';
import { OverlayService } from '../overlay/overlay.service';
import { PublicService } from '../core/public.service';
import { UrlEnum } from '../app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  UrlEnum: typeof UrlEnum = UrlEnum;
  url: string = this.UrlEnum.Home;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private overlayService: OverlayService,
    private publicService: PublicService
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = val.url.slice(1);
      }
    });
  }

  get isDark(): boolean {
    return this.navbarService.isDark;
  }

  isActiveUrl(url: string): boolean {
    return url === this.url;
  }

  toggleDark(): void {
    this.navbarService.isDark = !this.navbarService.isDark;
    if (!this.publicService.isLgDevice) {
      // close men after toggle theme
      // this.toggleMenu();
      if (!this.publicService.atPageTop) {
        this.navbarService.show = false;
      }
    }
  }

  get openMenu(): boolean {
    return this.navbarService.openMenu;
  }

  toggleMenu(): void {
    if (!this.publicService.isLgDevice) {
      // active overlay when open menu
      this.navbarService.openMenu = !this.navbarService.openMenu;
      this.overlayService.isActive = this.navbarService.openMenu ? true : false;
    }
  }

  get show(): boolean {
    return this.navbarService.show;
  }
}
