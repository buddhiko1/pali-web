import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-save-svg',
  standalone: true,
  imports: [],
  templateUrl: './save.component.svg',
})
export class SaveSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
