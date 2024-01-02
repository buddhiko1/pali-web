import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sun-svg',
  standalone: true,
  imports: [],
  templateUrl: './sun.component.svg',
})
export class SunSvgComponent {
  @Input() class = [''];
}
