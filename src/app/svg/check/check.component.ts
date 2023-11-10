import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check.component.svg',
})
export class CheckSvgComponent {
  @Input() class = [''];
}
