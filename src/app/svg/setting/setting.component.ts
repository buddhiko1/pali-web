import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setting-svg',
  standalone: true,
  imports: [],
  templateUrl: './setting.component.svg',
})
export class SettingSvgComponent {
  @Input() class: string[] | string = [''];
  @Input() size = '';
}
