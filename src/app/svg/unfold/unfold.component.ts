import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unfold-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unfold.component.svg',
})
export class UnfoldSvgComponent {
  @Input() class = [''];
}
