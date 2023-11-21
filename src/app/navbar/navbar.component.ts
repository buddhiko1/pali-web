import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { fromEvent, throttleTime } from 'rxjs';

import { FadeInDirective } from '../core/fade-in.directive';
import { PlusSvgComponent } from '../svg/plus/plus.component';
import { MoonSvgComponent } from '../svg/moon/moon.component';
import { SunSvgComponent } from '../svg/sun/sun.component';
import { EmailSvgComponent } from '../svg/email/email.component';
import { PersonSvgComponent } from '../svg/person/person.component';
import { ThemeEnum } from './navbar.model';
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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private _activeUrl = '';
  private _previousScrollPosition = 0;
  private _isMenuHaveBeenToggled = false;
  ThemeEnum: typeof ThemeEnum = ThemeEnum;
  showOverlay = false;
  isCollapsed = false;
  isMenuOpened = false;
  routes: RoutesFragment[] = [];

  constructor(
    private _router: Router,
    private _navbarService: NavbarService,
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
        const currentScrollPosition = window.scrollY;
        currentScrollPosition < this._previousScrollPosition
          ? (this.isCollapsed = false)
          : (this.isCollapsed = true);
        this._previousScrollPosition = currentScrollPosition;
      });
  }

  toggleMenu(): void {
    if (!this._isMenuHaveBeenToggled) {
      this._isMenuHaveBeenToggled = true;
    }
    this.isMenuOpened = !this.isMenuOpened;
    this.showOverlay = !this.showOverlay;
  }

  switchTheme(): void {
    switch (this._navbarService.theme) {
      case ThemeEnum.DEFAULT:
        this._navbarService.theme = ThemeEnum.NIGHT;
        break;
      case ThemeEnum.NIGHT:
        this._navbarService.theme = ThemeEnum.DEFAULT;
        break;
    }
  }

  get theme(): ThemeEnum {
    return this._navbarService.theme;
  }

  get animationClass(): string {
    if (this._isMenuHaveBeenToggled) {
      return this.isMenuOpened ? 'c-menu-opened' : 'c-menu-closed';
    }
    return '';
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
