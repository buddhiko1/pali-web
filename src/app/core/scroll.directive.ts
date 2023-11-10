import { Directive, OnDestroy } from '@angular/core';
import { fromEvent, throttleTime, Subscription } from 'rxjs';

import { NavbarService } from '../navbar/navbar.service';
import { ScrollbarService } from './scrollbar.service';

@Directive({
  selector: '[appScrollBehavior]',
  standalone: true,
})
export class ScrollDirective implements OnDestroy {
  private _subscription: Subscription;
  private _previousScrollPosition = 0;
  constructor(
    private _navbarService: NavbarService,
    private _scrollbarService: ScrollbarService,
  ) {
    this._subscription = fromEvent(document, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => {
        this._scrollbarService.showScrollbar();
        const currentScrollPosition = window.scrollY;
        currentScrollPosition < this._previousScrollPosition
          ? this._navbarService.show()
          : this._navbarService.hide();
        this._previousScrollPosition = currentScrollPosition;
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
