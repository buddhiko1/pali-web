import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Notification,
  NotificationPayload,
  NotificationEnum,
} from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationsSubject = new Subject<Notification>();

  pushInfo(notificationPayload: NotificationPayload): void {
    const notification: Notification = {
      timestamp: Date.now(),
      type: NotificationEnum.INFO,
      title: notificationPayload.title,
      content: notificationPayload.content,
    };
    this.notificationsSubject.next(notification);
  }

  pushErrorInfo(notificationPayload: NotificationPayload): void {
    const notification: Notification = {
      timestamp: Date.now(),
      type: NotificationEnum.ERROR,
      title: notificationPayload.title,
      content: notificationPayload.content,
    };
    this.notificationsSubject.next(notification);
  }

  isErrorNotification(notification: Notification): boolean {
    return notification.type === NotificationEnum.ERROR;
  }

  pushSuccessInfo(notificationPayload: NotificationPayload): void {
    const notification: Notification = {
      timestamp: Date.now(),
      type: NotificationEnum.SUCCESS,
      title: notificationPayload.title,
      content: notificationPayload.content,
    };
    this.notificationsSubject.next(notification);
  }

  isSuccessNotification(notification: Notification): boolean {
    return notification.type === NotificationEnum.SUCCESS;
  }
}
