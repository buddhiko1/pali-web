import { Component, OnInit } from '@angular/core';
// import { ChangeDetectorRef } from '@angular/core';

import { ScreenService } from '../shared/services/screen.service';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(
    // private _changeDetectorRef: ChangeDetectorRef,
    private _screenService: ScreenService,
    private _notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this._notificationsService.notificationsSubject.subscribe(
      (notification) => {
        this.notifications = [...this.notifications, notification];
        // this._changeDetectorRef.detectChanges(); // for rending the first notification immediately
      },
    );
  }

  get isPc(): boolean {
    return this._screenService.isPc;
  }

  remove(notification: Notification): void {
    this.notifications = this.notifications.filter(
      (n) => n.timestamp !== notification.timestamp,
    );
  }
}
