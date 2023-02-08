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

  set isActive(value: boolean) {
    this._isActive = value;
    if (value) {
      // disable body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // enable body scroll
      document.body.style.removeProperty('overflow');
    }
  }
}
