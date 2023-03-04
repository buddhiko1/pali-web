import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { PublicService } from './core/public.service';

@Directive({
  selector: '[appScrollSlide]',
  standalone: true,
})
export class ScrollSlideDirective implements OnDestroy, OnInit {
  private _windowHeight = window.innerHeight;
  private _thresholdHeight = 30;
  private _isDisplayed = false;
  private _eventSub!: Subscription;
  private _slideClass: string;

  constructor(private _el: ElementRef, private _publicService: PublicService) {
    this._slideClass = this._publicService.isLgDevice
      ? 'g-slide-lg'
      : 'g-slide';
    this._el.nativeElement.classList.add(this._slideClass);
    this._el.nativeElement.classList.add('g-slide-1s');
  }

  ngOnInit(): void {
    this._eventSub = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(50),
        tap(() => this._slideOnScroll())
      )
      .subscribe();
  }

  private _slideOnScroll(): void {
    if (this._isDisplayed) {
      return;
    }
    const elementTop = this._el.nativeElement.getBoundingClientRect().top;
    if (elementTop < this._windowHeight - this._thresholdHeight) {
      this._el.nativeElement.classList.add('g-slide-active');
      this._isDisplayed = true;
      window.setTimeout(() => {
        this._el.nativeElement.classList.remove('g-slide-1s');
        this._el.nativeElement.classList.remove(this._slideClass);
      }, 1000);
    }
  }

  ngOnDestroy() {
    this._eventSub.unsubscribe();
  }
}
