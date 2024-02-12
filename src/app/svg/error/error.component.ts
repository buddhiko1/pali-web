import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-error-svg',
  standalone: true,
  imports: [],
  templateUrl: './error.component.svg',
})
export class ErrorSvgComponent extends SvgComponent {}
