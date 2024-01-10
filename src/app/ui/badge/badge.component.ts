import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @HostBinding('style.--width')
  @Input()
  size = '1.5rem';
}
