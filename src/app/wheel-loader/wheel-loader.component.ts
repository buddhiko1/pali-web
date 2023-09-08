import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-wheel-loader',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './wheel-loader.component.html',
  styleUrls: ['./wheel-loader.component.css'],
})
export class WheelLoaderComponent {
  @Input() pxSize = 80;
  @Input() cycleTime = 20; // seconds for a circle to complete

  constructor() {}

  @HostBinding('style.--cycleTime') get _cycleTime() {
    return `${this.cycleTime}s`;
  }
}
