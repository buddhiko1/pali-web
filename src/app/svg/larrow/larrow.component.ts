import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-larrow-svg',
  standalone: true,
  imports: [],
  templateUrl: './larrow.component.svg',
})
export class LarrowSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
