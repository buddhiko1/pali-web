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
  }
}
