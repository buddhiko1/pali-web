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
  @Input() wheelSize = 80;
  @Input() rotateDelay = 0;
  @Input() cycleTime = 10;
  @Input() stop = false;

  constructor() {}

  @HostBinding('style.--cycleTime') get _cycleTime() {
    return `${this.cycleTime}s`;
  }

  @HostBinding('style.--rotateDelay') get _rotateDelay() {
    return `${this.rotateDelay}s`;
  }
}
