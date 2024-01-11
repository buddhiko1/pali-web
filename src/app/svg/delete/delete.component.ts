import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-svg',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.svg',
})
export class DeleteSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
