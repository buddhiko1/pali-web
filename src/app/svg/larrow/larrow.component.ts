import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-larrow-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './larrow.component.svg',
})
export class LarrowSvgComponent {
  @Input() class = [''];
}
