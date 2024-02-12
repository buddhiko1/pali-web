import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-svg',
  standalone: true,
  imports: [],
  template: ``,
})
export class SvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
