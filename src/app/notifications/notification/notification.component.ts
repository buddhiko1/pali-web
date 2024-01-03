import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { timer, Subscription } from 'rxjs';

import { ErrorSvgComponent } from 'src/app/svg/error/error.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { InfoSvgComponent } from 'src/app/svg/info/info.component';
import { UpSvgComponent } from 'src/app/svg/up/up.component';
import { DownSvgComponent } from 'src/app/svg/down/down.component';
import { CloseSvgComponent } from 'src/app/svg/close/close.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { Notification } from '../notifications.model';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    ErrorSvgComponent,
    CheckSvgComponent,
    InfoSvgComponent,
    UpSvgComponent,
    DownSvgComponent,
    CloseSvgComponent,
    FadeInDirective,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() notification!: Notification;
  @Input() duration = 10000;
  @Output() closed = new EventEmitter<void>();
  isContentFolded = true;
  shouldSlideOut = false;
  private _isMouseEntered = false;
  private _timerSubscription!: Subscription;

  constructor(
    private _screenService: ScreenService,
    private _notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    const timerSubject = timer(this.duration);
    this._timerSubscription = timerSubject.subscribe(() => {
      if (!this._isMouseEntered && this.isContentFolded) {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    this._timerSubscription.unsubscribe();
  }

  get isPc(): boolean {
    return this._screenService.isPc;
  }

  close(): void {
    this.isContentFolded = true;
    this.shouldSlideOut = true;
    // waiting for slide out animation.
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

  isErrorNotification(notification: Notification): boolean {
    return this._notificationsService.isErrorNotification(notification);
  }

  isSuccessNotification(notification: Notification): boolean {
    return this._notificationsService.isSuccessNotification(notification);
  }
}
