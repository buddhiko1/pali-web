import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { PublicService } from './core/public.service';

@Directive({
  selector: '[appLoadSlide]',
  standalone: true,
})
export class LoadSlideDirective implements OnDestroy, OnInit {
  private _isDisplayed = false;
  private _eventSub!: Subscription;
  private _timeoutId = 0;
  private _slideClass: string;

  @Input() slideDelay = 0; // ms

  constructor(private _el: ElementRef, private _publicService: PublicService) {
    this._slideClass = this._publicService.isLgDevice
      ? 'g-slide-lg'
      : 'g-slide';
    this._el.nativeElement.classList.add(this._slideClass);
    this._el.nativeElement.classList.add('g-slide-2s');
  }

  ngOnInit(): void {
    this._eventSub = fromEvent(window, 'load')
      .pipe(tap(() => this._slideOnLoad()))
      .subscribe();
  }

  private _slideOnLoad(): void {
    if (this._isDisplayed) {
      return;
    }
    this._timeoutId = window.setTimeout(() => {
      this._el.nativeElement.classList.add('g-slide-active');
      this._isDisplayed = true;
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove('g-slide-2s');
        this._el.nativeElement.classList.remove(this._slideClass);
      }, 2000);
      this._timeoutId = 0;
    }, this.slideDelay);
  }

  ngOnDestroy() {
    this._eventSub.unsubscribe();
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
  }
}
