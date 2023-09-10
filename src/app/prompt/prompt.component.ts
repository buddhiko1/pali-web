import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideOnLoadingDirective } from 'src/app/core/slide-on-loading.directive';
import { WheelComponent } from '../wheel/wheel.component';

export enum StatusEnum {
  Idle = 'Idle',
  Progress = 'In progress ...',
  Successful = 'Successful',
  Failed = 'Failed',
}

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [CommonModule, SlideOnLoadingDirective, WheelComponent],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent {
  @Input() prompt = '';
  @Input() status = StatusEnum.Idle;

  get isDone(): boolean {
    return this.status !== StatusEnum.Progress;
  }
}
