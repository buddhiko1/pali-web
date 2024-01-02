import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-svg',
  standalone: true,
  imports: [],
  templateUrl: './email.component.svg',
})
export class EmailSvgComponent {
  @Input() class = [''];
}
