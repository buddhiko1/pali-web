import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-wheel-svg',
  standalone: true,
  imports: [],
  templateUrl: './wheel.component.svg',
  styleUrl: './wheel.component.css',
})
export class WheelSvgComponent {
  @Input() size = '5rem';
  @HostBinding('style.--delay')
  @Input()
  delay = '0ms';
  @HostBinding('style.--cycleTime')
  @Input()
  cycleTime = '10000ms';
  @Input() stop = false;

  get class(): string[] {
    return ['start', this.stop ? 'stop' : ''];
  }
}
