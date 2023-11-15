import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationsSubject = new Subject<Notification>();

  push(notification: Notification): void {
    this.notificationsSubject.next(notification);
  }
}
