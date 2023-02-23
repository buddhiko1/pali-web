import { Injectable } from '@angular/core';
import { PublicService } from '../core/public.service';
import { OverlayService } from '../overlay/overlay.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isMenuOpen: boolean;
  private _isHeaderShow: boolean;

  constructor(
    private _publicService: PublicService,
    private _overlayService: OverlayService
  ) {
    this._isMenuOpen = false;
    this._isHeaderShow = true;
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  openMenu(): void {
    if (!this._publicService.isLgDevice) {
      this._overlayService.active(true);
      this._isHeaderShow = true;
      this._isMenuOpen = true;
    }
  }

  closeMenu(): void {
    if (!this._publicService.isLgDevice) {
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
}
