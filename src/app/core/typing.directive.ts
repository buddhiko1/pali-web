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

  private _typing(): void {
    interval(this.speed)
      .pipe(
        map((i) => i),
        take(this._charList.length),
      )
      .subscribe((i) => {
        const charToInsert = this._charList[i];
        if (i == 0) {
          this._el.nativeElement.innerHTML += `${charToInsert}▌`;
        } else {
          this._el.nativeElement.innerHTML =
            this._el.nativeElement.innerHTML.slice(0, -1) + `${charToInsert}▌`;
        }
        if (i == this._charList.length - 1) {
          this._el.nativeElement.innerHTML =
            this._el.nativeElement.innerHTML.slice(0, -1); // remove last char '▌'
          this._blinking();
        }
      });
  }

  private _blinking(): void {
    const speed = 700; // ms
    const counter = 10;
    interval(speed)
      .pipe(
        map((i) => i),
        take(counter),
      )
      .subscribe((i) => {
        const text = this._el.nativeElement.innerHTML;
        if (i == 0) {
          this._el.nativeElement.innerHTML += '▌';
        } else if (i == counter - 1) {
          this._el.nativeElement.innerHTML = text.slice(0, -1);
        } else {
          const lastChar = text.charAt(text.length - 1);
          this._el.nativeElement.innerHTML = text.slice(0, -1);
          this._el.nativeElement.innerHTML += lastChar == '▌' ? ' ' : '▋';
        }
      });
  }
}
