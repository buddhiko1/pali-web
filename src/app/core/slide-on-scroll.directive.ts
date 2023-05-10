import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

const slideDurationClass = 'g-slider-1000ms';

@Directive({
  selector: '[appSlideOnScroll]',
  standalone: true,
})
export class SlideOnScrollDirective implements OnDestroy {
  private _windowHeight = window.innerHeight;
  private _thresholdHeight = 30;
  private _isDisplayed = false;
  private _eventSub!: Subscription;
  private _slideClass: string;

  constructor(
    private _el: ElementRef,
    private _deviceService: DeviceDetectorService
  ) {
    this._slideClass = this._deviceService.isDesktop()
      ? 'g-slider-lg'
      : 'g-slider';
    this._el.nativeElement.classList.add(this._slideClass);
    this._el.nativeElement.classList.add(slideDurationClass);

    this._eventSub = fromEvent(window, 'scroll')
      .pipe(throttleTime(50))
      .subscribe(() => this._slideOnScroll());
  }

  private _slideOnScroll(): void {
    if (this._isDisplayed) {
      return;
    }
    const elementTop = this._el.nativeElement.getBoundingClientRect().top;
    if (elementTop < this._windowHeight - this._thresholdHeight) {
      this._el.nativeElement.classList.add('g-slider-active');
      this._isDisplayed = true;
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove(slideDurationClass);
        this._el.nativeElement.classList.remove(this._slideClass);
      }, 1500);
    }
  }

  ngOnDestroy() {
    this._eventSub.unsubscribe();
  }
}
