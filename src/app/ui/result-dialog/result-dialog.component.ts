import { Component, Input } from '@angular/core';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { ErrorSvgComponent } from 'src/app/svg/error/error.component';

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [DialogBoxComponent, CheckSvgComponent, ErrorSvgComponent],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.css',
})
export class ResultDialogComponent {
  @Input() error?: string;
  @Input() prompt?: string;
}
