import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-close-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './close.component.svg',
})
export class CloseSvgComponent {
  @Input() class = [''];
}
