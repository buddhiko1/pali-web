import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadeInDirective } from '../core/fade-in.directive';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, FadeInDirective, OverlayComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class LoaderComponent {
  @Input() title = '';
  @Input() errorInfo = '';
  @Input() successInfo = '';
  @Output() done = new EventEmitter<void>();

  onSubmit() {
    this.done.emit();
  }
}
