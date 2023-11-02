import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private _isActive: boolean;

  constructor() {
    this._isActive = false;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  active() {
    document.body.style.overflow = 'hidden'
    this._isActive = true;
  }

  deactive() {
    document.body.style.removeProperty('overflow');
    this._isActive = false;
  }
}
