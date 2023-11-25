import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlideIn]',
  standalone: true,
})
export class SlideInDirective implements OnInit {
  @Input() slideInDelay = 0;
  @Input() slideInDuration = 1000;
  @Input() slideInClass = 'ga-slide-in-from-bottom';

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this._el.nativeElement,
      'animation',
      `${this.slideInClass} ${this.slideInDuration}ms ease-in-out ${this.slideInDelay}ms both`,
    );
  }
}
