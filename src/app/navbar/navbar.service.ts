import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isDark: boolean;
  private _isMenuOpen: boolean;
  private _isShow: boolean;

  constructor() {
    this._isDark = false;
    this._isMenuOpen = false;
    this._isShow = true;
  }

  get isDark(): boolean {
    return this._isDark;
  }

  set isDark(value: boolean) {
    // bug fix of tailwindcss background color
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    //
    this._isDark = value;
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  set isMenuOpen(value: boolean) {
    this._isMenuOpen = value;
  }

  get isShow(): boolean {
    return this._isShow;
  }

  set isShow(value: boolean) {
    this._isShow = value;
  }
}
