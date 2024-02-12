import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-quote-svg',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.svg',
})
export class QuoteSvgComponent extends SvgComponent {}
