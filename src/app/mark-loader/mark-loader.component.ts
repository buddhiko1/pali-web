import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
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
  styleUrls: ['./mark-loader.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      // transition(
      //   ':leave',
      //   [
      //     style({ opacity: 1 }),
      //     animate('1s ease-in',
      //             style({ opacity: 0 }))
      //   ]
      // )
    ]),
  ],
})
export class MarkLoaderComponent {
  @Input() status = StatusEnum.Idle;
  @Input() size = '1.5rem';
  @Input() borderWidth = '1px';

  @HostBinding('style.--size') get _size() {
    return this.size;
  }

  @HostBinding('style.--borderWidth') get _borderWidth() {
    return this.borderWidth;
  }

  constructor() {}

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
