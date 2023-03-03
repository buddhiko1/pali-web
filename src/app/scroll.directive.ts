import { Directive, HostListener } from '@angular/core';
import { NavbarService } from './navbar/navbar.service';
import { PublicService } from './core/public.service';

@Directive({
  selector: '[appScroll]',
  standalone: true,
})
export class ScrollDirective {
  constructor(
    private _navbarService: NavbarService,
    private _publicService: PublicService
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScroll = window.scrollY;

    // deal with navbar
    if (currentScroll <= 50) {
      // reach the top
      this._navbarService.showHeader(true);
      return;
    }
    if (this._navbarService.isHeaderShow) {
      this._navbarService.showHeader(false);
    }

    // deal with scrollbar
    this._publicService.showScrollbar();
  }
}
