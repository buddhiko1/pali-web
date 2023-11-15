import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFaderOut]',
  standalone: true,
})
export class FadeOutDirective implements OnInit {
  @Input() fadeOutDelay = 0;
  @Input() fadeOutDuration = 1000;

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this._el.nativeElement,
      'animation',
      `g-fade-out ${this.fadeOutDuration}ms ease-in-out ${this.fadeOutDelay}ms both`,
    );
  }
}
