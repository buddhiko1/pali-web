import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollbarService {
  private _isScrollbarShow = false;
  private _scrollbarTimeoutId = 0;

  constructor() {}

  get isScrollbarShow(): boolean {
    return this._isScrollbarShow;
  }

  hideScrollbar(): void {
    if (!this._isScrollbarShow) {
      return;
    }
    if (this._scrollbarTimeoutId) {
      window.clearTimeout(this._scrollbarTimeoutId);
      this._scrollbarTimeoutId = 0;
    }
    document.documentElement.classList.remove('g-scrollbar');
    document.documentElement.classList.add('g-scrollbar-hidden');
    this._isScrollbarShow = false;
  }

  showScrollbar(): void {
    if (this._isScrollbarShow) {
      return;
    }
    document.documentElement.classList.remove('g-scrollbar-hidden');
    document.documentElement.classList.add('g-scrollbar');
    // hide scrollbar automatically after 3 seconds
    this._scrollbarTimeoutId = window.setTimeout(() => {
      this.hideScrollbar();
      this._scrollbarTimeoutId = 0;
    }, 3000);
    this._isScrollbarShow = true;
  }
}
