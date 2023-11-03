import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _isMaskBg: boolean;

  constructor() {
    this._isMaskBg = false;
  }

  get isMaskBg(): boolean {
    return this._isMaskBg;
  }

  activeMaskBg() {
    this._isMaskBg = true;
  }

  deactiveMaskBg() {
    this._isMaskBg = false;
  }
}
