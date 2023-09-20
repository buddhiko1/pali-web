import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxRerenderModule } from 'ngx-rerender';

import { SliderDirective } from '../core/slider.directive';
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
  @Input() title = '';
  @Input() prompt = '';
  @Input() status = StatusEnum.Idle;
  @Output() submitted = new EventEmitter<void>();

  constructor(private _deviceService: DeviceDetectorService) {}

  get isLargeDevice(): boolean {
    return this._deviceService.isDesktop();
  }

  get showPrompt(): boolean {
    return this.status !== StatusEnum.Loading && Boolean(this.prompt);
  }

  get isSuccessful(): boolean {
    return this.status === StatusEnum.Successful;
  }

  get isFailed(): boolean {
    return this.status === StatusEnum.Failed;
  }

  get titleShowing(): string {
    return this.isSuccessful || this.isFailed ? this.status : this.title;
  }

  onSubmit() {
    this.submitted.emit();
  }
}
