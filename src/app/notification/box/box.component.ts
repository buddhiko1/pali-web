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
import { UpSvgComponent } from 'src/app/svg/up/up.component';
import { DownSvgComponent } from 'src/app/svg/down/down.component';
import { CloseSvgComponent } from 'src/app/svg/close/close.component';
import { FadeInDirective } from 'src/app/core/fade-in.directive';
import { ScreenService } from 'src/app/core/screen.service';
import { InfoEnum } from 'src/app/core/public.value';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-notification-box',
  standalone: true,
  imports: [
    CommonModule,
    ErrorSvgComponent,
    CheckSvgComponent,
    InfoSvgComponent,
    UpSvgComponent,
    DownSvgComponent,
    CloseSvgComponent,
    FadeInDirective,
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
})
export class BoxComponent implements OnInit, OnDestroy {
  @Input() notification!: Notification;
  @Input() duration = 10000;
  @Output() closed = new EventEmitter<void>();
  InfoEnum = InfoEnum;
  isContentFolded = true;
  shouldSlideOut = false;
  showDialog = false;
  private _isMouseEntered = false;
  private _timerSubscription!: Subscription;

  constructor(private _screenService: ScreenService) {}

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
}
