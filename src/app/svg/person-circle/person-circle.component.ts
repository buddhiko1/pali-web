import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-circle-svg',
  standalone: true,
  imports: [],
  templateUrl: './person-circle.component.svg',
})
export class PersonCircleSvgComponent {
  @Input() size = '1.5rem';
  @Input() class = [''];
}
