import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckSvgComponent } from '../svg/check/check.component';
import { CloseSvgComponent } from '../svg/close/close.component';

@Component({
  selector: 'app-mark-loader',
  standalone: true,
  imports: [CommonModule, CheckSvgComponent, CloseSvgComponent],
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
