import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Directive({
  selector: '[appTyping]',
  standalone: true,
})
export class TypingDirective implements OnInit {
  private _charList = [];
  @Input() speed = 40; // 40ms per char
  @Input() delay = 0;

  constructor(private _el: ElementRef) {}

  ngOnInit(): void {
    this._charList = this._el.nativeElement.innerHTML.split('');
    this._el.nativeElement.innerHTML = '';
    setTimeout(this._typing.bind(this), this.delay);
  }

  private _blinking(): void {
    const speed = 700; // ms
    const counter = 14;
    interval(speed)
      .pipe(
        map((i) => i + 1),
        take(counter)
      )
      .subscribe((i) => {
        const text = this._el.nativeElement.innerHTML;
        if (i == 1) {
          this._el.nativeElement.innerHTML += ' ▌';
        } else if (i == counter) {
          this._el.nativeElement.innerHTML = text.slice(0, -2);
        } else {
          const lastChar = text.charAt(text.length - 1);
          this._el.nativeElement.innerHTML = text.slice(0, -1);
          if (lastChar == '▌') {
            this._el.nativeElement.innerHTML += ' ';
          } else {
            this._el.nativeElement.innerHTML += '▌';
          }
        }
      });
  }

  private _typing(): void {
    interval(this.speed)
      .pipe(
        map((i) => this._charList[i]),
        take(this._charList.length)
      )
      .subscribe((char) => {
        this._el.nativeElement.innerHTML += `${char}`;
        if (this._el.nativeElement.innerHTML.length == this._charList.length) {
          this._blinking();
        }
      });
  }
}
