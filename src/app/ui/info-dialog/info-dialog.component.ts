import { Component, Input } from '@angular/core';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { ErrorSvgComponent } from 'src/app/svg/error/error.component';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [DialogBoxComponent, CheckSvgComponent, ErrorSvgComponent],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css',
})
export class InfoDialogComponent {
  @Input() error?: string;
  @Input() prompt?: string;
}
