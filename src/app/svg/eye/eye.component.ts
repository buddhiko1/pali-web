import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eye-svg',
  standalone: true,
  imports: [],
  templateUrl: './eye.component.svg',
})
export class EyeSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
