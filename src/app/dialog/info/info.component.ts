import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorSvgComponent } from 'src/app/svg/error/error.component';
import { InfoSvgComponent } from 'src/app/svg/info/info.component';
import { CheckSvgComponent } from 'src/app/svg/check/check.component';
import { InfoEnum } from 'src/app/core/public.value';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [
    CommonModule,
    BoxComponent,
    ErrorSvgComponent,
    InfoSvgComponent,
    CheckSvgComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoDialogComponent {
  @Input() type: InfoEnum = InfoEnum.INFO;
  @Input() title = '';
  @Input() content = '';
  @Output() infoDialogClosed = new EventEmitter();
  InfoEnum = InfoEnum;

  onSubmit(): void {
    this.infoDialogClosed.emit();
  }
}
