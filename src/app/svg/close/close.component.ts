import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-svg',
  standalone: true,
  imports: [],
  templateUrl: './close.component.svg',
})
export class CloseSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
