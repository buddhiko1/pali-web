import { Component, OnInit } from '@angular/core';

import { ScreenService } from '../shared/services/screen.service';
import { BoxComponent } from './box/box.component';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(
    private _screenService: ScreenService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this._notificationService.notificationsSubject.subscribe((notification) => {
      this.notifications.push(notification);
    });
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
