import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

const SLIDER_CLASS = 'g-slider';
const SLIDER_LG_CLASS = 'g-slider-lg';
const SLIDER_ACTIVE_CLASS = 'g-slider-active';

@Directive({
  selector: '[appSlider]',
  standalone: true,
})
export class SliderDirective implements OnDestroy, OnInit {
  @Input() slideDelay = 0;

  private _timeoutId = 0;
  private _sliderClass = '';

  constructor(
    private _el: ElementRef,
    private _deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this._sliderClass = this._deviceService.isDesktop()
      ? SLIDER_LG_CLASS
      : SLIDER_CLASS;
    this._el.nativeElement.classList.add(this._sliderClass);
    this._slideOnLoad();
  }

  private _slideOnLoad(): void {
    this._timeoutId = window.setTimeout(() => {
      this._el.nativeElement.classList.add(SLIDER_ACTIVE_CLASS);
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove(this._sliderClass);
      }, 3000);
      this._timeoutId = 0;
    }, this.slideDelay);
  }

  ngOnDestroy() {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
    }
  }
}
