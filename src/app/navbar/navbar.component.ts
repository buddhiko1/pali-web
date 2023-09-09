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
    this._navbarService.activeDark(!this.isDark);
    this._scrollbarService.showScrollbar();
    if (this._navbarService.isMenuOpen) {
      this.closeMenu();
    }
  }

  routeTo(page: UrlEnum): void {
    this._router.navigateByUrl(page);
    this.closeMenu();
    // switch (page) {
    //   case UrlEnum.Home: {
    //     this._router.navigateByUrl(UrlEnum.Home);
    //     this.closeMenu();
    //     break;
    //   }
    //   case UrlEnum.Grammar: {
    //     this._router.navigateByUrl(UrlEnum.Grammar);
    //     break;
    //   }
    //   case UrlEnum.Dictionary: {
    //     this._router.navigateByUrl(UrlEnum.Dictionary);
    //     break;
    //   }
    //   case UrlEnum.Vocabulary: {
    //     this._router.navigateByUrl(UrlEnum.Vocabulary);
    //     break;
    //   }
    //   case UrlEnum.Tipitaka: {
    //     this._router.navigateByUrl(UrlEnum.Tipitaka);
    //     break;
    //   }
    //   case UrlEnum.Reading: {
    //     this._router.navigateByUrl(UrlEnum.Reading);
    //     break;
    //   }
    //   case UrlEnum.Blog: {
    //     this._router.navigateByUrl(UrlEnum.Dictionary);
    //     break;
    //   }
    // }
  }

  get isMenuOpen(): boolean {
    return this._navbarService.isMenuOpen;
  }

  closeMenu(): void {
    this._navbarService.closeMenu();
    console.log('close menu');
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
