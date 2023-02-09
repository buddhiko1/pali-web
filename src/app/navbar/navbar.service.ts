import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isDark: boolean;
  private _openMenu: boolean;
  private _show: boolean;

  constructor() {
    this._isDark = false;
    this._openMenu = false;
    this._show = true;
  }

  get isDark(): boolean {
    return this._isDark;
  }

  set isDark(value: boolean) {
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this._isDark = value;
  }

  get openMenu(): boolean {
    return this._openMenu;
  }

  set openMenu(value: boolean) {
    this._openMenu = value;
  }

  get show(): boolean {
    return this._show;
  }

  set show(value: boolean) {
    this._show = value;
  }
}
