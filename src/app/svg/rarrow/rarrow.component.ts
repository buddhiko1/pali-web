import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rarrow-svg',
  standalone: true,
  imports: [],
  templateUrl: './rarrow.component.svg',
})
export class RarrowSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
