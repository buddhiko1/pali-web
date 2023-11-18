import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit {
  @Input() fadeInDelay = 0;
  @Input() fadeInDuration = 1000;

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this._el.nativeElement,
      'animation',
      `ga-fade-in ${this.fadeInDuration}ms ease-in-out ${this.fadeInDelay}ms both`,
    );
  }
}
