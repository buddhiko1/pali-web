import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _isLgDevice: boolean;
  private _isScrollbarShow = false;
  // private _scrollbarTimoutId = 0;

  constructor(private deviceService: DeviceDetectorService) {
    this._isLgDevice = this.deviceService.isDesktop();
  }

  get isLgDevice(): boolean {
    return this._isLgDevice;
  }

  get atPageTop(): boolean {
    return window.scrollY <= 0;
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
