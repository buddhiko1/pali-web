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

  active(value: boolean) {
    // disable or enable body scroll according to value
    value
      ? (document.body.style.overflow = 'hidden')
      : document.body.style.removeProperty('overflow');
    this._isActive = value;
  }
}
