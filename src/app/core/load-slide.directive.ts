import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PublicService } from './public.service';

const slideDurationClass = 'g-slide-1500ms';

@Directive({
  selector: '[appLoadSlide]',
  standalone: true,
})
export class LoadSlideDirective implements OnDestroy, OnInit {
  private _isDisplayed = false;
  private _timeoutId = 0;
  private _slideClass: string;

  @Input() slideDelay = 0; // ms

  constructor(
    private _el: ElementRef,
    private _publicService: PublicService,
    private _router: Router
  ) {
    this._slideClass = this._publicService.isLgDevice
      ? 'g-slide-lg'
      : 'g-slide';
    this._el.nativeElement.classList.add(this._slideClass);
    this._el.nativeElement.classList.add(slideDurationClass);
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
      this._el.nativeElement.classList.add('g-slide-active');
      this._isDisplayed = true;
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove(slideDurationClass);
        this._el.nativeElement.classList.remove(this._slideClass);
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
