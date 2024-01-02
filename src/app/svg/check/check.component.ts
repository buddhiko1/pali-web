import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-svg',
  standalone: true,
  imports: [],
  templateUrl: './check.component.svg',
})
export class CheckSvgComponent {
  @Input() class = [''];
}
