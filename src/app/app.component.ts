import { Component, HostListener, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { NavbarService } from './navbar/navbar.service';
import { OverlayService } from './overlay/overlay.service';
import { easeAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [easeAnimation],
})
export class AppComponent implements OnInit {
  title = 'pali-web';
  lastScroll = 0;
  scrollSpan = 30;
  isScrollbarShow = false;
  scrollbarTimoutId = 0;
  showMenuBtn = false;
  menuBtnTimoutId = 0;

  constructor(
    private contexts: ChildrenOutletContexts,
    private navbarService: NavbarService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this._showScrollbar();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  get isDark(): boolean {
    return this.navbarService.isDark;
  }

  get openMenu(): boolean {
    return this.navbarService.isMenuOpen;
  }

  get isMenuShow(): boolean {
    return this.navbarService.isMenuOpen;
  }

  displayMenu(): void {
    this.showMenuBtn = false;
    this.overlayService.isActive = true;
    this.navbarService.isShow = true;
    this.navbarService.isMenuOpen = true;
  }

  toggleMenuBtn(): void {
    // if (this.menuBtnTimoutId) {
    //   window.clearTimeout(this.menuBtnTimoutId);
    // }
    // if (!this.showMenuBtn) {
    //   if (!this.navbarService.show) {
    //     this.showMenuBtn = true;
    //     // hide menu button after 3s
    //     this.menuBtnTimoutId = window.setTimeout(() => {
    //       this.showMenuBtn = false;
    //     }, 3000);
    //   }
    // } else {
    //   this.showMenuBtn = false;
    // }
  }

  // fix bug of tailwindcss-scrollbar
  private _showScrollbar(): void {
    if (this.scrollbarTimoutId) {
      window.clearTimeout(this.scrollbarTimoutId);
    }
    document.documentElement.classList.remove('g-scrollbar-hide');
    document.documentElement.classList.add('g-scrollbar-show');
    this.scrollbarTimoutId = window.setTimeout(() => {
      this._hideScrollbar();
    }, 3000);
    this.isScrollbarShow = true;
  }

  private _hideScrollbar(): void {
    document.documentElement.classList.remove('g-scrollbar-show');
    document.documentElement.classList.add('g-scrollbar-hide');
    this.isScrollbarShow = false;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    //
    // if (this.menuBtnTimoutId) {
    //   window.clearTimeout(this.menuBtnTimoutId);
    // }

    // reach the top
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      this.navbarService.isShow = true;
      this.showMenuBtn = false;
      return;
    }

    // deal with navbar
    if (this.navbarService.isShow) {
      this.navbarService.isShow = false;
    }
    // deal with scrollbar
    if (!this.isScrollbarShow) {
      this._showScrollbar();
    }

    this.lastScroll = currentScroll;

    // show menu button if necessary
    // if (!this.navbarService.show) {
    //   this.showMenuBtn = true;
    //   // hide menu button after 2s
    //   this.menuBtnTimoutId = window.setTimeout(() => {
    //     this.showMenuBtn = false;
    //   }, 2000);
    // }
  }
}
