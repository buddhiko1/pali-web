import { Component, HostListener } from '@angular/core';
import { NavbarService } from './navbar/navbar.service';
import { OverlayService } from './overlay/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pali-web';
  lastScroll = 0;
  scrollSpan = 20;
  showMenuBtn = false;
  menuBtnTimoutId = 0;

  constructor(
    private navbarService: NavbarService,
    private overlayService: OverlayService
  ) {}

  get isDark(): boolean {
    return this.navbarService.isDark;
  }
  get openMenu(): boolean {
    return this.navbarService.openMenu;
  }

  get isMenuShow(): boolean {
    return this.navbarService.openMenu;
  }

  displayMenu(): void {
    this.showMenuBtn = false;
    this.overlayService.isActive = true;
    this.navbarService.show = true;
    this.navbarService.openMenu = true;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    //
    if (this.menuBtnTimoutId) {
      window.clearTimeout(this.menuBtnTimoutId);
    }

    // reach the top
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      this.navbarService.show = true;
      this.showMenuBtn = false;
      return;
    }

    // toggle navbar
    if (currentScroll > this.lastScroll && this.navbarService.show) {
      this.navbarService.show = false;
    } else if (
      currentScroll < this.lastScroll - this.scrollSpan &&
      !this.navbarService.show
    ) {
      this.navbarService.show = true;
      this.showMenuBtn = false;
    }
    this.lastScroll = currentScroll;

    // show menu button if necessary
    if (!this.navbarService.show) {
      this.showMenuBtn = true;
      // hide menu button after 2s
      this.menuBtnTimoutId = window.setTimeout(() => {
        this.showMenuBtn = false;
      }, 2000);
    }
  }
}
