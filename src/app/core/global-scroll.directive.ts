import { Directive, HostListener } from '@angular/core';
import { NavbarService } from 'src/app/navbar/navbar.service';

@Directive({
  selector: '[appScroll]',
  standalone: true,
})
export class ScrollDirective {
  constructor(private _navbarService: NavbarService) {}

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
  }
}
