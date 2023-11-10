import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollbarService {
  private _isShow = false;
  private _timeoutId = 0;

  get isEnabled(): boolean {
    return this._isShow;
  }

  hide(): void {
    if (!this._isShow) {
      return;
    }
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
    document.documentElement.classList.remove('g-scrollbar');
    document.documentElement.classList.add('g-hide-scrollbar');
    this._isShow = false;
  }

  show(): void {
    if (this._isShow) {
      return;
    }
    document.documentElement.classList.remove('g-hide-scrollbar');
    document.documentElement.classList.add('g-scrollbar');
    this._isShow = true;
    // hide scrollbar automatically after 3 seconds
    this._timeoutId = setTimeout(() => {
      this.hide();
      this._timeoutId = 0;
    }, 3000);
  }
}
