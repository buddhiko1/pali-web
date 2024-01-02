import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus-svg',
  standalone: true,
  imports: [],
  templateUrl: './plus.component.svg',
})
export class PlusSvgComponent {
  @Input() class = [''];
}
