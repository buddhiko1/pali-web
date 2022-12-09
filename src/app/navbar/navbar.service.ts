import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isDark: boolean;
  private _openMenu: boolean;

  constructor() {
    this._isDark = false;
    this._openMenu = false;
  }

  get isDark(): boolean {
    return this._isDark;
  }

  set isDark(value: boolean) {
    this._isDark = value;
  }

  get openMenu(): boolean {
    return this._openMenu;
  }

  set openMenu(value: boolean) {
    this._openMenu = value;
  }
}
