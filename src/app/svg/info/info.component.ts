import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-svg',
  standalone: true,
  imports: [],
  templateUrl: './info.component.svg',
})
export class InfoSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
