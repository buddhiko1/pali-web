import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-draft-svg',
  standalone: true,
  imports: [],
  templateUrl: './draft.component.svg',
})
export class DraftSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
