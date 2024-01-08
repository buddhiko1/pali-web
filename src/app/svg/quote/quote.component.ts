import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quote-svg',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.svg',
})
export class QuoteSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '3rem';
}
