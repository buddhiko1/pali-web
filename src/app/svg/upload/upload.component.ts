import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-svg',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.svg',
})
export class UploadSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
