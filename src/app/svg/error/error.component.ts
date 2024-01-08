import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-svg',
  standalone: true,
  imports: [],
  templateUrl: './error.component.svg',
})
export class ErrorSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
