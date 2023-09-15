import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFader]',
  standalone: true,
})
export class FadeInDirective implements OnInit {
  @Input() fadeDelay = 0;
  @Input() fadeDuration = 1000;

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this._el.nativeElement,
      'animation',
      `g-fade-in ${this.fadeDuration}ms ease-in-out ${this.fadeDelay}ms both`,
    );
  }
}
