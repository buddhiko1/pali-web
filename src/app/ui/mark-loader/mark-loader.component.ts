import { Component, Input, HostBinding } from '@angular/core';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { CloseSvgComponent } from 'src/app/svg/close/close.component';

@Component({
  selector: 'app-mark-loader',
  standalone: true,
  imports: [CheckSvgComponent, CloseSvgComponent],
  templateUrl: './mark-loader.component.html',
  styleUrl: './mark-loader.component.css',
})
export class MarkLoaderComponent {
  @Input() errorInfo = '';
  @Input() successInfo = '';
  @HostBinding('style.--size')
  @Input()
  size = '1.5rem';
  @HostBinding('style.--borderWidth')
  @Input()
  borderWidth = '0.07rem';
}
