import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  @Input({ required: true })
  tip!: string;

  @Input()
  position = 'up'; // up, down, left, right

  @HostBinding('style.--distance')
  distance = '1.1rem';
}
