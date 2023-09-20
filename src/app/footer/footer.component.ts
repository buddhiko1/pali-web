import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SliderDirective } from 'src/app/core/slider.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, SliderDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isVisible = false;

  constructor(
    private _el: ElementRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    // ajsust footer position when route change
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isVisible = false;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.adjustPosition();
          this.isVisible = true;
        }, 1000);
      }
    });
  }

  adjustPosition() {
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    if (docHeight <= windowHeight) {
      this._el.nativeElement.style.position = 'fixed';
      this._el.nativeElement.style.bottom = '0';
      this._el.nativeElement.style.width = '100%';
    } else {
      this._el.nativeElement.style.position = 'static';
    }
  }
}
