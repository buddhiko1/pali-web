import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.svg',
})
export class QuoteSvgComponent {
  @Input() size = '3rem';
  @Input() class = [''];
}
