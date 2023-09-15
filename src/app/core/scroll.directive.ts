import { Directive, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { NavbarService } from 'src/app/navbar/navbar.service';
import { ScrollbarService } from 'src/app/core/scrollbar.service';

@Directive({
  selector: '[appScrollBehavior]',
  standalone: true,
})
export class ScrollDirective implements OnDestroy {
  private _subscription: Subscription;
  constructor(
    private _navbarService: NavbarService,
    private _scrollbarService: ScrollbarService
  ) {
    this._subscription = fromEvent(document, 'scroll').subscribe(() => {
      this._scrollbarService.showScrollbar();
        this._navbarService.showHeader(window.scrollY <= 50);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
