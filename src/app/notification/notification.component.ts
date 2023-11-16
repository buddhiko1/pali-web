import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

import { SlideInDirective } from '../core/slide-in.directive';
import { SlideOutDirective } from '../core/slide-out.directive';
import { BoxComponent } from './box/box.component';
import { NotificationService } from './notification.service';
import { Notification, NotificationEnum } from './notification.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, BoxComponent, SlideInDirective, SlideOutDirective],
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
    const intervalSubject = interval(2000);
    intervalSubject.subscribe((n) => {
      this._notificationService.notificationsSubject.next({
        timestamp: Date.now(),
        type: n % 2 ? NotificationEnum.ERROR : NotificationEnum.INFO,
        message: n % 2 ? 'the world is dangerous, keep safe!' : 'what?',
      });
    });
  }

  remove(notification: Notification): void {
    this.notifications = this.notifications.filter(
      (n) => n.timestamp !== notification.timestamp,
    );
  }
}
