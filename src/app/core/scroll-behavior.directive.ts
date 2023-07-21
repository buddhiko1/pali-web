import { Directive, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, throttleTime } from 'rxjs';

import { NavbarService } from 'src/app/navbar/navbar.service';
import { ScrollbarService } from 'src/app/core/scrollbar.service';

@Directive({
  selector: '[appScrollBehavior]',
  standalone: true,
})
export class ScrollBehaviorDirective implements OnDestroy {
  private _subscription: Subscription;
  constructor(
    private _navbarService: NavbarService,
    private _scrollbarService: ScrollbarService
  ) {
    this._subscription = fromEvent(document, 'scroll').subscribe(() => {
      this._scrollbarService.showScrollbar();
      const currentScroll = window.scrollY;
      if (currentScroll <= 50) {
        this._navbarService.showHeader(true);
        return;
      }
      if (this._navbarService.isHeaderShow) {
        this._navbarService.showHeader(false);
      }
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
