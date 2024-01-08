import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heart-svg',
  standalone: true,
  imports: [],
  templateUrl: './heart.component.svg',
})
export class HeartSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
