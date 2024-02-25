import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService implements OnDestroy {
  private history: string[] = [];
  private readonly _subscription = new Subscription();

  constructor(
    private router: Router,
    private location: Location,
  ) {
    this._subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.history.push(event.urlAfterRedirects);
        }
      }),
    );
  }

  goBack(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  historyGo(relativePosition?: number): void {
    this.location.historyGo(relativePosition);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
