import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person.component.svg',
})
export class PersonSvgComponent {
  @Input() size = '1.5rem';
  @Input() class = [''];
}
