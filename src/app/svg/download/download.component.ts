import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download.component.svg',
})
export class DownloadSvgComponent {
  @Input() class = [''];
}
