import { Component, OnDestroy } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { fromEvent, throttleTime, Subscription } from 'rxjs';

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
export class NavbarComponent implements OnDestroy {
  private _activeUrl = '';
  private _previousScrollPosition = 0;
  private _subscription: Subscription;
  showOverlay = false;
  isShow = true;
  isDark = false;
  isMenuOpened = false;
  routes: RoutesFragment[] = [];

  constructor(
    private _router: Router,
    private _navbarService: NavbarService,
    private _scrollbarService: ScrollbarService,
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activeUrl = event.url.split('/')[1];
      }
    });
    this._subscription = fromEvent(document, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(() => {
        this._scrollbarService.showScrollbar();
        const currentScrollPosition = window.scrollY;
        currentScrollPosition < this._previousScrollPosition
          ? (this.isShow = true)
          : (this.isShow = false);
        this._previousScrollPosition = currentScrollPosition;
      });
    this._navbarService.fetchRoutes().then((routes) => {
      this.routes = routes;
    });
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.showOverlay = !this.showOverlay;
  }

  toggleDark(): void {
    this._scrollbarService.hideScrollbar();
    this.isDark
      ? document.body.classList.remove('night')
      : document.body.classList.add('night');
    this.isDark = !this.isDark;
    this._scrollbarService.showScrollbar();
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

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
