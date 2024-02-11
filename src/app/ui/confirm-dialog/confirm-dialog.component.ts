import { Component, Input } from '@angular/core';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { WarningSvgComponent } from 'src/app/svg/warning/warning.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DialogBoxComponent, WarningSvgComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Input({ required: true }) title?: string;
  @Input({ required: true }) prompt?: string;
}
