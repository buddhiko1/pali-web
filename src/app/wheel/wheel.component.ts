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
  @Input() pxSize = 80;
  @Input() stop = false;
  @Input() cycleTime = 20; // seconds for a circle to complete

  constructor() {}

  @HostBinding('style.--cycleTime') get _cycleTime() {
    return `${this.cycleTime}s`;
  }
}
