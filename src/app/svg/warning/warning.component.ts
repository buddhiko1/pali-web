import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning-svg',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.svg',
})
export class WarningSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
