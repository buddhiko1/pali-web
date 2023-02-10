import { Component, Input, HostBinding } from '@angular/core';
import { Config } from './book.model';

@Component({
  standalone: true,
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
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

  get transformClass() {
    return this.config.direction ?? 'right-view';
  }

  set transformClass(value: string) {
    this.transformClass = value; // 'right-view' 'left-view'
  }
}
