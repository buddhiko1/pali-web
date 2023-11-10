import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sun-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sun.component.svg',
})
export class SunSvgComponent {
  @Input() class = [''];
}
