import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxRerenderModule } from 'ngx-rerender';

import { FadeInDirective } from '../core/fade-in.directive';
import { OverlayComponent } from '../overlay/overlay.component';
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
  imports: [
    CommonModule,
    NgxRerenderModule,
    FadeInDirective,
    OverlayComponent,
    WheelComponent,
  ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnChanges {
  @Input() title = '';
  @Input() status = StatusEnum.Idle;
  @Input() prompt = '';
  @Input() stayWhenSuccessful = false;
  @Input() stayWhenFailed = false;
  @Output() failed = new EventEmitter<void>();
  @Output() successful = new EventEmitter<void>();

  constructor(private _deviceService: DeviceDetectorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.stayWhenSuccessful) {
      if (changes['status'].currentValue === StatusEnum.Successful) {
        this.successful.emit();
      }
    } else if (!this.stayWhenFailed) {
      if (changes['status'].currentValue === StatusEnum.Failed) {
        this.failed.emit();
      }
    }
  }

  get wheelSize(): number {
    if (this._deviceService.isMobile()) {
      return 4;
    } else {
      return 6;
    }
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
    this.isFailed ? this.failed.emit() : this.successful.emit();
  }
}
