import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-svg',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.svg',
})
export class EditSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
