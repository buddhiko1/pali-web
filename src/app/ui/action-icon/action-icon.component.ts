import { Component, Input, HostBinding } from '@angular/core';
import { TooltipComponent } from 'src/app/ui/tooltip/tooltip.component';

@Component({
  selector: 'app-action-icon',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './action-icon.component.html',
  styleUrl: './action-icon.component.css',
})
export class ActionIconComponent {
  @HostBinding('style.--borderWidth')
  borderWidth = '0.15rem';

  @HostBinding('style.--size')
  @Input()
  size = '1.1rem';

  @Input()
  isLoading = false;

  @Input()
  tip = '';

  @Input()
  tipPosition = 'up';
}
