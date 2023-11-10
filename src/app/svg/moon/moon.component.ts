import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moon-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moon.component.svg',
})
export class MoonSvgComponent {
  @Input() class = [''];
}
