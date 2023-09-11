import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxRerenderModule } from 'ngx-rerender';

import { SliderDirective } from 'src/app/core/slider.directive';
import { WheelComponent } from '../wheel/wheel.component';

export enum StatusEnum {
  Idle = 'Idle',
  Progress = 'In progress ...',
  Successful = 'Successful',
  Failed = 'Failed',
}

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [CommonModule, NgxRerenderModule, SliderDirective, WheelComponent],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent {
  @Input() prompt = '';
  @Input() status = StatusEnum.Idle;
  @Output() submitted = new EventEmitter<void>();

  constructor(private _deviceService: DeviceDetectorService) {}

  get isLargeDevice(): boolean {
    return this._deviceService.isDesktop();
  }

  get isDone(): boolean {
    return this.status !== StatusEnum.Progress;
  }

  get isSuccessful(): boolean {
    return this.status === StatusEnum.Successful;
  }

  get isFailed(): boolean {
    return this.status === StatusEnum.Failed;
  }

  submit() {
    this.submitted.emit();
  }
}
