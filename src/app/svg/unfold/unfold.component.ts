import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-unfold-svg',
  standalone: true,
  imports: [],
  templateUrl: './unfold.component.svg',
})
export class UnfoldSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
