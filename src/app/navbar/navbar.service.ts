import { Injectable } from '@angular/core';
import { ThemeEnum } from './navbar.model';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _theme: ThemeEnum = ThemeEnum.DEFAULT;

  get theme(): ThemeEnum {
    return this._theme;
  }
  set theme(theme: ThemeEnum) {
    this._theme = theme;
  }
}
