import {
  Component,
  Input,
  HostBinding,
  ContentChild,
  AfterContentInit,
} from '@angular/core';

import { TooltipComponent } from 'src/app/ui/tooltip/tooltip.component';
import { SvgComponent } from 'src/app/svg/svg/svg.component';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent implements AfterContentInit {
  @ContentChild('svg') svg!: SvgComponent;

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

  ngAfterContentInit() {
    this.svg.size = this.size || this.svg.size;
  }
}
