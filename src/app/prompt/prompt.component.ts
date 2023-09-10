import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderDirective } from 'src/app/core/slider.directive';
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
  imports: [CommonModule, SliderDirective, WheelComponent],
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
