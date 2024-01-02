import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ErrorSvgComponent } from 'src/app/svg/error/error.component';
import { InfoSvgComponent } from 'src/app/svg/info/info.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [
    DialogBoxComponent,
    ErrorSvgComponent,
    InfoSvgComponent,
    CheckSvgComponent,
  ],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css',
})
export class InfoDialogComponent {
  @Input() isErrorInfo = false;
  @Input() isSuccessInfo = false;
  @Input() title = '';
  @Input() content = '';
  @Output() infoDialogClosed = new EventEmitter();

  onSubmit(): void {
    this.infoDialogClosed.emit();
  }
}
