import { Injectable } from '@angular/core';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notifications: string[] = [];

  get isEmpty(): boolean {
    return this._notifications.length === 0;
  }

  pushNotification(notification: Notification): void {
    this._notifications.unshift(notification);
  }

  popNotification(): Notification {
    return this._notifications.pop();
  }

  clearNotifications(): void {
    this._notifications = [];
  }
}
