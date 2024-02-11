import { Component, Input, HostBinding } from '@angular/core';
import { TooltipComponent } from 'src/app/ui/tooltip/tooltip.component';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  @HostBinding('style.--borderWidth')
  borderWidth = '0.15rem';

  @HostBinding('style.--size')
  @Input()
  size = '1.1rem';

  @Input()
  isButtonStyle = true;

  @Input()
  isRounded = false;

  @Input()
  isDisabled = false;

  @Input()
  isLoading = false;

  @Input()
  tip = '';

  @Input()
  tipPosition = 'top';
}
