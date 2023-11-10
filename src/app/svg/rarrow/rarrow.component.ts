import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rarrow-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rarrow.component.svg',
})
export class RarrowSvgComponent {
  @Input() class = [''];
}
