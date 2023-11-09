import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

export enum StatusEnum {
  Idle = 'idle',
  Loading = 'loading',
  Successful = 'successful',
  Failed = 'failed',
}

@Component({
  selector: 'app-mark-loader',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './mark-loader.component.html',
  styleUrl: './mark-loader.component.css',
})
export class MarkLoaderComponent {
  @Input() status = StatusEnum.Idle;
  @HostBinding('style.--size')
  @Input()
  size = '1.5rem';
  @HostBinding('style.--borderWidth')
  @Input()
  borderWidth = '0.07rem';

  get isShowing(): boolean {
    return this.status !== StatusEnum.Idle;
  }

  get isSuccessful(): boolean {
    return this.status === StatusEnum.Successful;
  }

  get isFailed(): boolean {
    return this.status === StatusEnum.Failed;
  }
}
