import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isShow = true;
  private _isDark = false;
  private _isMenuOpen = false;

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

  toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
  }

  get isShow(): boolean {
    return this._isShow;
  }

  show() {
    this._isShow = true;
  }

  hide() {
    this._isShow = false;
  }
}
