import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

import { BoxComponent } from './box/box.component';
import { NotificationService } from './notification.service';
import { Notification, NotificationEnum } from './notification.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(private _notificationService: NotificationService) {}

  ngOnInit(): void {
    this._notificationService.notificationsSubject.subscribe((notification) => {
      this.notifications.push(notification);
    });
    this.test();
  }

  get isEmpty(): boolean {
    return this.notifications.length === 0;
  }

  test(): void {
    const timerSubject = timer(2000);
    timerSubject.subscribe((n) => {
      this._notificationService.notificationsSubject.next({
        timestamp: Date.now(),
        title: 'test title',
        type: n % 2 ? NotificationEnum.ERROR : NotificationEnum.INFO,
        content: n % 2 ? 'the world is dangerous, keep safe!' : 'what?',
      });
    });
  }

  remove(notification: Notification): void {
    this.notifications = this.notifications.filter(
      (n) => n.timestamp !== notification.timestamp,
    );
  }
}
