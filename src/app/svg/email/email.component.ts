import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email.component.svg',
})
export class EmailSvgComponent {
  @Input() class = [''];
}
