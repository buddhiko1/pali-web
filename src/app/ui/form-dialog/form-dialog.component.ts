import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [CommonModule, DialogBoxComponent],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css',
})
export class FormDialogComponent {}
