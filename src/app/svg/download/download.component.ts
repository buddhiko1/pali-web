import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-download-svg',
  standalone: true,
  imports: [],
  templateUrl: './download.component.svg',
})
export class DownloadSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
