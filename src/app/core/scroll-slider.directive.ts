import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

const SLIDER_CLASS = 'g-slider';
const SLIDER_LG_CLASS = 'g-slider-lg';
const SLIDING_CLASS = 'g-slider-1000ms';
const SLIDER_ACTIVE_CLASS = 'g-slider-active';

@Directive({
  selector: '[appScrollSlider]',
  standalone: true,
})
export class ScrollSliderDirective implements OnDestroy {
  private _windowHeight = window.innerHeight;
  private _thresholdHeight = 30;
  private _isDisplayed = false;
  private _eventSub!: Subscription;
  private _sliderClass: string;

  constructor(
    private _el: ElementRef,
    private _deviceService: DeviceDetectorService
  ) {
    this._sliderClass = this._deviceService.isDesktop()
      ? SLIDER_LG_CLASS
      : SLIDER_CLASS;
    this._el.nativeElement.classList.add(this._sliderClass);
    this._el.nativeElement.classList.add(SLIDING_CLASS);

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
      this._el.nativeElement.classList.add(SLIDER_ACTIVE_CLASS);
      this._isDisplayed = true;
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove(SLIDING_CLASS);
        this._el.nativeElement.classList.remove(this._sliderClass);
      }, 1500);
    }
  }

  ngOnDestroy() {
    this._eventSub.unsubscribe();
  }
}
