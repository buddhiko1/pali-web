import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
})
export class WheelComponent {
  @Input() size = 80;
  @Input() delay = 0;
  @Input() cycleTime = 10;
  @Input() stop = false;

  constructor() {}

  @HostBinding('style.--cycleTime') get _cycleTime() {
    return `${this.cycleTime}s`;
  }

  @HostBinding('style.--delay') get _delay() {
    return `${this.delay}s`;
  }
}
