import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(
    private _el: ElementRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    // ajsust footer position when route change
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const activeUrl = event.url.split('/')[1];
        if (activeUrl === 'account') {
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
