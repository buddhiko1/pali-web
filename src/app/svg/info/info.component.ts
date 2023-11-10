import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.svg',
})
export class InfoSvgComponent {
  @Input() class = [''];
}
