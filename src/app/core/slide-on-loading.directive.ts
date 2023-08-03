import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

const SLIDER_CLASS = 'g-slider';
const SLIDER_LG_CLASS = 'g-slider-lg';
const SLIDING_CLASS = 'g-slider-1500ms';
const SLIDER_ACTIVE_CLASS = 'g-slider-active';

@Directive({
  selector: '[appSlideOnLoading]',
  standalone: true,
})
export class SlideOnLoadingDirective implements OnDestroy, OnInit {
  private _isDisplayed = false;
  private _timeoutId = 0;
  private _sliderClass: string;

  @Input() slideDelay = 0;

  constructor(
    private _el: ElementRef,
    private _deviceService: DeviceDetectorService,
    private _router: Router
  ) {
    this._sliderClass = this._deviceService.isDesktop()
      ? SLIDER_LG_CLASS
      : SLIDER_CLASS;
    this._el.nativeElement.classList.add(this._sliderClass);
    this._el.nativeElement.classList.add(SLIDING_CLASS);
  }

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._slideOnLoad();
      }
    });
    this._slideOnLoad();
  }

  private _slideOnLoad(): void {
    if (this._isDisplayed) {
      return;
    }
    this._timeoutId = window.setTimeout(() => {
      this._el.nativeElement.classList.add(SLIDER_ACTIVE_CLASS);
      this._isDisplayed = true;
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove(SLIDING_CLASS);
        this._el.nativeElement.classList.remove(this._sliderClass);
      }, 2000);
      this._timeoutId = 0;
    }, this.slideDelay);
  }

  ngOnDestroy() {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
  }
}
