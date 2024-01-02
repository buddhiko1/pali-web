import { Component } from '@angular/core';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [DialogBoxComponent],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css',
})
export class FormDialogComponent {}
