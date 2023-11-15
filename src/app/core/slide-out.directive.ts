import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlideOut]',
  standalone: true,
})
export class SlideInDirective implements OnInit {
  @Input() slideOutDelay = 0;
  @Input() slideOutDuration = 1000;

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this._el.nativeElement,
      'animation',
      `g-slide-out ${this.slideOutDuration}ms ease-in-out ${this.slideOutDelay}ms both`,
    );
  }
}
