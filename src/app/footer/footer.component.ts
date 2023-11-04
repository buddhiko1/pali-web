import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FadeInDirective } from '../core/fade-in.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FadeInDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  startPath = '';
  fixedPath = ['account', 'vocabulary', 'grammar'];
  constructor(
    private _el: ElementRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const destinationPath = event.url.split('/')[1];
        if (
          this.startPath &&
          this.fixedPath.includes(this.startPath) &&
          this.fixedPath.includes(destinationPath)
        ) {
          return;
        }
        this._el.nativeElement.style.display = 'none';
      } else if (event instanceof NavigationEnd) {
        const activedPath = event.url.split('/')[1];
        if (this._el.nativeElement.style.display === 'none') {
          if (this.fixedPath.includes(activedPath)) {
            this._el.nativeElement.style.position = 'fixed';
            this._el.nativeElement.style.bottom = '0';
            this._el.nativeElement.style.width = '100%';
          } else {
            this._el.nativeElement.style.position = 'relative';
          }
          setTimeout(() => {
            this._el.nativeElement.style.display = 'block';
          }, 800);
        }
        this.startPath = activedPath;
      }
    });
  }
}
