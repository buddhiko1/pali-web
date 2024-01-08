import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-up-svg',
  standalone: true,
  imports: [],
  templateUrl: './up.component.svg',
})
export class UpSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
