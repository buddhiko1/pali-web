import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-down-svg',
  standalone: true,
  imports: [],
  templateUrl: './down.component.svg',
})
export class DownSvgComponent {
  @Input() class = [''];
}
