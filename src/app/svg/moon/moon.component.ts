import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moon-svg',
  standalone: true,
  imports: [],
  templateUrl: './moon.component.svg',
})
export class MoonSvgComponent {
  @Input() class = [''];
}
