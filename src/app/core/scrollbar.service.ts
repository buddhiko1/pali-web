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
    document.documentElement.classList.remove('g-scrollbar-dark');
    document.documentElement.classList.add('g-scrollbar-hide');
    this._isScrollbarShow = false;
  }

  showScrollbar(isDark: boolean): void {
    if (this._isScrollbarShow) {
      return;
    }
    document.documentElement.classList.remove('g-scrollbar-hide');
    document.documentElement.classList.add(
      isDark ? 'g-scrollbar-dark' : 'g-scrollbar'
    );
    this._scrollbarTimeoutId = window.setTimeout(() => {
      this.hideScrollbar();
      this._scrollbarTimeoutId = 0;
    }, 3000);
    this._isScrollbarShow = true;
  }
}
