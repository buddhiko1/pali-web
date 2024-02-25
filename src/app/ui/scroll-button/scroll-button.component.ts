import {
  Component,
  AfterViewInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { UpSvgComponent } from 'src/app/svg/up/up.component';
import { DownSvgComponent } from 'src/app/svg/down/down.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { FadeOutDirective } from 'src/app/shared/directives/fade-out.directive';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  imports: [
    UpSvgComponent,
    DownSvgComponent,
    IconButtonComponent,
    FadeInDirective,
    FadeOutDirective,
  ],
  templateUrl: './scroll-button.component.html',
  styleUrl: './scroll-button.component.css',
})
export class ScrollButtonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('button') button!: ElementRef;

  @Input()
  size = '1.1rem';

  isShow = true;
  isUpward = false;
  private readonly _subscription = new Subscription();

  constructor() {}

  ngAfterViewInit(): void {
    this._subscription.add(
      fromEvent(document, 'scroll').subscribe(() => {
        const newScrollTop = window.scrollY;
        if (newScrollTop <= 200) {
          this.isUpward = false;
          this.isShow = true;
        } else if (
          document.body.scrollHeight - (newScrollTop + window.innerHeight) <=
          200
        ) {
          this.isUpward = true;
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }),
    );
  }

  scroll(): void {
    window.scrollTo({
      top: this.isUpward ? 0 : document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
