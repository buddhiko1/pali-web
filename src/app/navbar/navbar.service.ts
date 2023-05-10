import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { OverlayService } from '../overlay/overlay.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isMenuOpen = false;
  private _isHeaderShow = true;
  private _isShadowShow = true;
  private _isDark = false;

  constructor(
    private _deviceService: DeviceDetectorService,
    private _overlayService: OverlayService
  ) {}

  get isDark(): boolean {
    return this._isDark;
  }

  activeDark(value: boolean) {
    value
      ? document.documentElement.classList.add('night')
      : document.documentElement.classList.remove('night');
    this._isDark = value;
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  openMenu(): void {
    if (!this._deviceService.isDesktop()) {
      this._overlayService.active(true);
      this._isHeaderShow = true;
      this._isMenuOpen = true;
    }
  }

  closeMenu(): void {
    if (!this._deviceService.isDesktop()) {
      this._isMenuOpen = false;
      this._overlayService.active(false);
    }
  }

  get isHeaderShow(): boolean {
    return this._isHeaderShow;
  }

  showHeader(value: boolean) {
    this._isHeaderShow = value;
  }

  get isShadowShow(): boolean {
    return this._isShadowShow;
  }

  showShadow(value: boolean) {
    this._isShadowShow = value;
  }
}
