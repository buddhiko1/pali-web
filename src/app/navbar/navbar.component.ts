import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { fromEvent, throttleTime } from 'rxjs';

import { FadeInDirective } from '../core/fade-in.directive';
import { OverlayComponent } from '../overlay/overlay.component';
import { ScrollbarService } from '../core/scrollbar.service';
import { PlusSvgComponent } from '../svg/plus/plus.component';
import { MoonSvgComponent } from '../svg/moon/moon.component';
import { SunSvgComponent } from '../svg/sun/sun.component';
import { EmailSvgComponent } from '../svg/email/email.component';
import { PersonSvgComponent } from '../svg/person/person.component';
import { NavbarService } from './navbar.service';
import { RoutesFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    RouterLink,
    FadeInDirective,
    PlusSvgComponent,
    MoonSvgComponent,
    SunSvgComponent,
    EmailSvgComponent,
    PersonSvgComponent,
    OverlayComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private _activeUrl = '';
  private _previousScrollPosition = 0;
  showOverlay = false;
  isCollapsed = false;
  isDark = false;
  isMenuOpened = false;
  routes: RoutesFragment[] = [];

  constructor(
    private _router: Router,
    private _navbarService: NavbarService,
    private _scrollbarService: ScrollbarService,
  ) {
    this._navbarService.fetchRoutes().then((routes) => {
      this.routes = routes;
    });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activeUrl = event.url.split('/')[1];
      }
    });
    fromEvent(document, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(() => {
        this._scrollbarService.show();
        const currentScrollPosition = window.scrollY;
        currentScrollPosition < this._previousScrollPosition
          ? (this.isCollapsed = false)
          : (this.isCollapsed = true);
        this._previousScrollPosition = currentScrollPosition;
      });
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.showOverlay = !this.showOverlay;
  }

  toggleDark(): void {
    this._scrollbarService.hide();
    this.isDark
      ? document.body.classList.remove('night')
      : document.body.classList.add('night');
    this.isDark = !this.isDark;
    this._scrollbarService.show();
  }

  routeTo(url: string): void {
    if (this._activeUrl !== url) {
      if (this.isMenuOpened) {
        this.toggleMenu();
      }
      this._router.navigateByUrl(url);
    }
  }

  isActiveUrl(url: string): boolean {
    return url === this._activeUrl;
  }
}
