import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';
import { OverlayService } from '../overlay/overlay.service';
import { PublicService } from '../core/public.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private navbarService: NavbarService,
    private overlayService: OverlayService,
    private publicService: PublicService
  ) {}

  get isDark(): boolean {
    return this.navbarService.isDark;
  }

  toggleDark(): void {
    this.navbarService.isDark = !this.navbarService.isDark;
    if (!this.publicService.isLgDevice) {
      // close men after toggle theme
      this.toggleMenu();
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
