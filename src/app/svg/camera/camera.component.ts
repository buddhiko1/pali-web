import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-camera-svg',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.svg',
})
export class CameraSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
