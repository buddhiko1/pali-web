import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.css',
})
export class WheelComponent {
  @Input() size = 5;
  @HostBinding('style.--delay')
  @Input()
  delay = '0ms';
  @HostBinding('style.--cycleTime')
  @Input()
  cycleTime = '10000ms';
  @Input() stop = false;
}
