import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

import { ErrorSvgComponent } from 'src/app/svg/error/error.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { InfoSvgComponent } from 'src/app/svg/info/info.component';
import { UnfoldSvgComponent } from 'src/app/svg/unfold/unfold.component';
import { CloseSvgComponent } from 'src/app/svg/close/close.component';
import { Notification, NotificationEnum } from '../notification.model';

@Component({
  selector: 'app-notification-box',
  standalone: true,
  imports: [
    CommonModule,
    ErrorSvgComponent,
    CheckSvgComponent,
    InfoSvgComponent,
    UnfoldSvgComponent,
    CloseSvgComponent,
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
})
export class BoxComponent implements OnInit, OnDestroy {
  @Input() notification!: Notification;
  @Input() duration = 5000;
  @Output() closed = new EventEmitter<void>();
  notifcationEnum = NotificationEnum;
  isContentFolded = true;
  private _titleLength: number = 10;
  private _isMouseEntered = false;
  private _intervalSuscription!: Subscription;

  ngOnInit(): void {
    const intervalSubject = interval(this.duration);
    this._intervalSuscription = intervalSubject.subscribe(() => {
      if (!this._isMouseEntered) {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    this._intervalSuscription.unsubscribe();
  }

  get title(): string {
    return this.notification.message.length > this._titleLength
      ? `${this.notification.message.substring(0, this._titleLength)}...`
      : this.notification.message;
  }

  get content(): string {
    return this.notification.message.length > this._titleLength
      ? this.notification.message
      : '';
  }

  close(): void {
    this.closed.emit();
  }

  showContent(): void {
    this.isContentFolded = false;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this._isMouseEntered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._isMouseEntered = false;
  }
}
