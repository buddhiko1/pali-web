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
        map((i) => this._charList[i]),
        take(this._charList.length)
      )
      .subscribe((char) => {
        this._el.nativeElement.innerHTML += char;
      });
  }
}
