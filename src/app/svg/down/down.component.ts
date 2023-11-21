import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-down-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './down.component.svg',
})
export class DownSvgComponent {
  @Input() class = [''];
}
