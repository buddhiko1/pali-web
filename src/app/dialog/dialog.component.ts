import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../core/fade-in.directive';
import { SlideInDirective } from '../core/slide-in.directive';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FadeInDirective, SlideInDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() isCentral = false;

  ngOnInit(): void {
    document.documentElement.classList.add('gu-disable-scroll');
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove('gu-disable-scroll');
  }
}
