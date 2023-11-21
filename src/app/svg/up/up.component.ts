import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-up-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './up.component.svg',
})
export class UpSvgComponent {
  @Input() class = [''];
}
