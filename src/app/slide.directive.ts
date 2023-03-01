import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { PublicService } from './core/public.service';

@Directive({
  selector: '[appSlideElement]',
  standalone: true,
})
export class SlideElementDirective implements OnDestroy {
  private _windowHeight = window.innerHeight;
  private _elementVisible;
  private _isEnabled = false;
  private _eventSub: Subscription;

  constructor(private _el: ElementRef, private _publicService: PublicService) {
    if (this._publicService.isLgDevice) {
      // value from global styles.css
      this._elementVisible = 100;
      this._el.nativeElement.classList.add('g-slide-lg');
    } else {
      this._elementVisible = 30;
      this._el.nativeElement.classList.add('g-slide');
    }

    // throttle scroll event
    this._eventSub = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(50),
        tap(() => this._slide())
      )
      .subscribe();
  }

  private _slide(): void {
    if (this._isEnabled) {
      return;
    }
    const elementTop = this._el.nativeElement.getBoundingClientRect().top;
    if (elementTop < this._windowHeight - this._elementVisible) {
      this._el.nativeElement.classList.add('g-slide-active');
      this._isEnabled = true;
    }
  }

  ngOnDestroy() {
    this._eventSub.unsubscribe();
  }
}
