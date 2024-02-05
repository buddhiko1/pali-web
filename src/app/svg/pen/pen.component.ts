import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pen-svg',
  standalone: true,
  imports: [],
  templateUrl: './pen.component.svg',
})
export class PenSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
