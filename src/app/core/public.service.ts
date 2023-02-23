import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _isDark: boolean;
  private _isLgDevice: boolean;
  private _isScrollbarShow = false;
  private _scrollbarTimeoutId = 0;

  constructor(private deviceService: DeviceDetectorService) {
    this._isLgDevice = this.deviceService.isDesktop();
    this._isDark = false;
  }

  get isLgDevice(): boolean {
    return this._isLgDevice;
  }

  get isDark(): boolean {
    return this._isDark;
  }

  activeDark(value: boolean) {
    // bug fix of tailwindcss background color
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    //
    this._isDark = value;
  }

  toggleDark(): void {
    // hide scrollbar when switch theme
    if (this._isScrollbarShow) {
      this._hideScrollbar();
    }
    this._isDark ? this.activeDark(false) : this.activeDark(true);
    this.showScrollbar();
  }

  get isScrollbarShow(): boolean {
    return this._isScrollbarShow;
  }

  private _hideScrollbar(): void {
    if (this._scrollbarTimeoutId) {
      window.clearTimeout(this._scrollbarTimeoutId);
      this._scrollbarTimeoutId = 0;
    }
    document.documentElement.classList.remove('g-scrollbar');
    document.documentElement.classList.remove('g-scrollbar-dark');
    document.documentElement.classList.add('g-scrollbar-hide');
    this._isScrollbarShow = false;
  }

  // fix bug of tailwindcss-scrollbar
  showScrollbar(): void {
    if (this._isScrollbarShow) {
      return;
    }
    document.documentElement.classList.remove('g-scrollbar-hide');
    document.documentElement.classList.add(
      this._isDark ? 'g-scrollbar-dark' : 'g-scrollbar'
    );
    this._scrollbarTimeoutId = window.setTimeout(() => {
      this._hideScrollbar();
      this._scrollbarTimeoutId = 0;
    }, 3000);
    this._isScrollbarShow = true;
  }
}
