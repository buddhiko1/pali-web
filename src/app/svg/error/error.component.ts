import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.svg',
})
export class ErrorSvgComponent {
  @Input() class = [''];
}
