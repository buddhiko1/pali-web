import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _isDark: boolean;
  private _isLgDevice: boolean;
  private _isScrollbarShow = false;

  constructor(private deviceService: DeviceDetectorService) {
    this._isLgDevice = this.deviceService.isDesktop();
    this._isDark = false;
  }

  get isLgDevice(): boolean {
    return this._isLgDevice;
  }

  get atPageTop(): boolean {
    return window.scrollY <= 0;
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
    this._isDark ? this.activeDark(false) : this.activeDark(true);
  }

  get isScrollbarShow(): boolean {
    return this._isScrollbarShow;
  }

  private _hideScrollbar(): void {
    document.documentElement.classList.remove('g-scrollbar-show');
    document.documentElement.classList.add('g-scrollbar-hide');
    this._isScrollbarShow = false;
  }

  // fix bug of tailwindcss-scrollbar
  showScrollbar(): void {
    if (this._isScrollbarShow) {
      return;
    }
    document.documentElement.classList.remove('g-scrollbar-hide');
    document.documentElement.classList.add('g-scrollbar-show');
    window.setTimeout(() => {
      this._hideScrollbar();
    }, 3000);
    this._isScrollbarShow = true;
  }
}
