import { Component, Input, HostBinding } from '@angular/core';
import { Config } from './book.model';

export enum DirectionEnum {
  RightView = 'right-view',
  LeftView = 'left-view',
  FrontView = 'front-view',
}

@Component({
  standalone: true,
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() config!: Config;

  @HostBinding('style.--width') get width() {
    return this.config.width;
  }

  @HostBinding('style.--height') get height() {
    return this.config.height;
  }

  @HostBinding('style.--color') get color() {
    return this.config.color ?? '#F33139';
  }
}
