import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heart-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart.component.svg',
})
export class HeartSvgComponent {
  @Input() class = [''];
}
