import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';
import { SlideInDirective } from 'src/app/shared/directives/slide-in.directive';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [CommonModule, FadeInDirective, SlideInDirective],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
})
export class BoxComponent implements OnInit, OnDestroy {
  @Input() isCentral = false;

  ngOnInit(): void {
    document.documentElement.classList.add('gu-disable-scroll');
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove('gu-disable-scroll');
  }
}
