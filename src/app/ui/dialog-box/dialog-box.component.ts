import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { SlideInDirective } from 'src/app/shared/directives/slide-in.directive';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [FadeInDirective, SlideInDirective],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent implements OnInit, OnDestroy {
  @Input() isCentral = false;

  ngOnInit(): void {
    document.documentElement.classList.add('gu-disable-scroll');
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove('gu-disable-scroll');
  }
}
