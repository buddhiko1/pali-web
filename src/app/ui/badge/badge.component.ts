import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input()
  number = 0;

  get numberForShow(): number {
    return this.number > 99 ? 99 : this.number;
  }
}
