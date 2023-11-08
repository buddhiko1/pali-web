import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isShow = true;
  private _isDark = false;
  private _isMenuOpen = false;
  private _isShadowShow = true;

  get isDark(): boolean {
    return this._isDark;
  }

  activeDark(value: boolean) {
    value
      ? document.body.classList.add('night')
      : document.body.classList.remove('night');
    this._isDark = value;
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  openMenu(): void {
    this._isMenuOpen = true;
  }

  closeMenu(): void {
    this._isMenuOpen = false;
  }

  toggleMenu(): void {
    this._isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  get isShow(): boolean {
    return this._isShow;
  }

  show(value: boolean) {
    this._isShow = value;
  }

  get isShadowShow(): boolean {
    return this._isShadowShow;
  }

  showShadow(value: boolean) {
    this._isShadowShow = value;
  }
}
