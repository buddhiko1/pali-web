import { Component, OnInit } from '@angular/core';

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
    private _screenService: ScreenService,
    private _notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this._notificationsService.notificationsSubject.subscribe(
      (notification) => {
        this.notifications = [...this.notifications, notification];
        // for rending the first notification immediately in development mode
        // this._changeDetectorRef.detectChanges();
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
