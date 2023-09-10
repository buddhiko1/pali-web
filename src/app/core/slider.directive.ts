import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlider]',
  standalone: true,
})
export class SliderDirective implements OnInit {
  @Input() slideDelay = 0;
  @Input() slideDuration = 1500;

  constructor(private _el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this._el.nativeElement,
      'animation',
      `g-slide-in ${this.slideDuration}ms ease-in-out ${this.slideDelay}ms both`
    );
  }
}
