import { delay } from 'rxjs';
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
  constructor(
    private _el: ElementRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._el.nativeElement.style.display = 'none';
      }
    });
    this._router.events.pipe(delay(1000)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._el.nativeElement.style.display = 'block';
        const activeUrl = event.url.split('/')[1];
        if (['account', 'vocabulary', 'grammar'].includes(activeUrl)) {
          this._el.nativeElement.style.position = 'fixed';
          this._el.nativeElement.style.bottom = '0';
          this._el.nativeElement.style.width = '100%';
        } else {
          this._el.nativeElement.style.position = 'static';
        }
      }
    });
  }
}
