import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum StatusEnum {
  Idle = 'idle',
  Loading = 'loading',
  Successful = 'successful',
  Failed = 'failed',
}

@Component({
  selector: 'app-mark-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mark-loader.component.html',
  styleUrls: ['./mark-loader.component.css'],
})
export class MarkLoaderComponent implements OnInit {
  @Input() status = StatusEnum.Idle;

  constructor() {}

  ngOnInit(): void {}

  get divClass(): string[] {
    const classList = ['loading'];
    if (this.status === StatusEnum.Successful) {
      classList.push('successful');
    }
    return classList;
    // return `${this.status}`
  }
}
