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
import { timer, Subscription } from 'rxjs';

import { ErrorSvgComponent } from 'src/app/svg/error/error.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { InfoSvgComponent } from 'src/app/svg/info/info.component';
import { UnfoldSvgComponent } from 'src/app/svg/unfold/unfold.component';
import { CloseSvgComponent } from 'src/app/svg/close/close.component';
import { FadeInDirective } from 'src/app/core/fade-in.directive';
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
    FadeInDirective,
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
  shouldSlideOut = false;
  private _titleLength: number = 20;
  private _isMouseEntered = false;
  private _intervalSuscription!: Subscription;

  ngOnInit(): void {
    const intervalSubject = timer(this.duration, this.duration);
    this._intervalSuscription = intervalSubject.subscribe(() => {
      if (!this._isMouseEntered && this.isContentFolded) {
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

  get textClass(): string {
    switch (this.notification.type) {
      case NotificationEnum.INFO:
        return 'gc-text';
      case NotificationEnum.SUCCESS:
        return 'gc-text text-ok';
      case NotificationEnum.ERROR:
        return 'gc-text text-error';
      default:
        return '';
    }
  }

  close(): void {
    this.shouldSlideOut = true;
    timer(1000).subscribe(() => {
      this.closed.emit();
    });
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
