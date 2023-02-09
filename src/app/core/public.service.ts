import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _isLgDevice: boolean;

  constructor(private deviceService: DeviceDetectorService) {
    this._isLgDevice = this.deviceService.isDesktop();
  }

  get isLgDevice(): boolean {
    return this._isLgDevice;
  }

  get atPageTop(): boolean {
    return window.scrollY <= 0;
  }
}
