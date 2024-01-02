import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-svg',
  standalone: true,
  imports: [],
  templateUrl: './person.component.svg',
})
export class PersonSvgComponent {
  @Input() size = '1.5rem';
  @Input() class = [''];
}
