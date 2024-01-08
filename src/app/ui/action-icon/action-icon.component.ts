import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-action-icon',
  standalone: true,
  templateUrl: './action-icon.component.html',
  styleUrl: './action-icon.component.css',
})
export class ActionIconComponent {
  @HostBinding('style.--borderWidth')
  borderWidth = '0.15rem';

  @HostBinding('style.--size')
  size = '1.1rem';

  @Input()
  isLoading = false;
}