import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormDialogComponent {}
