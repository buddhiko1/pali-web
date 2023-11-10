import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plus-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plus.component.svg',
})
export class PlusSvgComponent {
  @Input() class = [''];
}
