import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxRerenderModule } from 'ngx-rerender';

import { SliderDirective } from 'src/app/core/slider.directive';
import { WheelComponent } from '../wheel/wheel.component';

export enum StatusEnum {
  Idle = 'Idle',
  Loading = 'Loading ...',
  Successful = 'Successful',
  Failed = 'Failed',
}

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, NgxRerenderModule, SliderDirective, WheelComponent],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Input() prompt = '';
  @Input() status = StatusEnum.Idle;
  @Output() closed = new EventEmitter<void>();

  constructor(private _deviceService: DeviceDetectorService) {}

  get isLargeDevice(): boolean {
    return this._deviceService.isDesktop();
  }

  get isDone(): boolean {
    return this.status !== StatusEnum.Loading;
  }

  get isSuccessful(): boolean {
    return this.status === StatusEnum.Successful;
  }

  get isFailed(): boolean {
    return this.status === StatusEnum.Failed;
  }

  close() {
    this.closed.emit();
  }
}
